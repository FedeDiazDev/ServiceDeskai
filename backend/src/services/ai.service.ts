import { GoogleGenAI, Type } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;

if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are an intelligent damage and failure detection assistant for a facility/equipment maintenance system.
Analyze images to determine if they show PHYSICAL DAMAGE or EQUIPMENT FAILURE.

VALID images: Broken equipment, infrastructure damage, electrical issues, plumbing problems, safety hazards, malfunctioning hardware.
INVALID images: Software screenshots, documents, photos without visible damage, selfies, blurry images.

IMPORTANT - BE CONCISE:
- title: Maximum 10 words. Example: "Broken chair leg in office" or "Water leak under sink"
- description: Maximum 3 sentences. Focus on: what is damaged, where, and severity.
- Do NOT write long explanations or repeat information.

Priority levels:
- low: Minor cosmetic damage
- medium: Functional issues, no safety risk
- high: Significant damage or minor safety concerns
- urgent: Safety hazards or critical failures

If the image does NOT show valid damage, set isValid to false with a brief rejectionReason.`;

const ticketSchema = {
    type: Type.OBJECT,
    properties: {
        isValid: {
            type: Type.BOOLEAN,
            description: "True if image shows physical damage or equipment failure",
        },
        rejectionReason: {
            type: Type.STRING,
            description: "Brief reason if isValid is false (1 sentence max)",
        },
        title: {
            type: Type.STRING,
            description: "Brief title, max 10 words",
        },
        description: {
            type: Type.STRING,
            description: "Concise description in 2-3 sentences max",
        },
        priority: {
            type: Type.STRING,
            enum: ["low", "medium", "high", "urgent"],
            description: "Priority based on severity",
        },
        tags: {
            type: Type.ARRAY,
            description: "2-5 relevant tags",
            items: {
                type: Type.STRING,
            },
        },
    },
    required: ["isValid"],
};

export interface GeneratedTicket {
    isValid: boolean;
    rejectionReason?: string;
    title?: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    tags?: string[];
}

export const aiService = {
    async analyzeImage(imageBase64: string, mimeType: string): Promise<GeneratedTicket> {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            inlineData: {
                                mimeType,
                                data: imageBase64,
                            },
                        },
                    ],
                },
            ],
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: ticketSchema,
            },
        });

        const text = response.text?.trim();

        if (!text) {
            throw new Error('INVALID_AI_RESPONSE');
        }

        try {
            return JSON.parse(text) as GeneratedTicket;
        } catch (error) {
            console.error('Error parsing AI response:', text);
            throw new Error('INVALID_AI_RESPONSE');
        }
    },
};
