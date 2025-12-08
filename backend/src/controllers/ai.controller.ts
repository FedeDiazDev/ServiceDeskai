import { Request, Response } from 'express';
import { aiService } from '../services/ai.service';

export const generateTicket = async (req: Request, res: Response): Promise<void> => {
    try {
        const { image, mimeType } = req.body;

        if (!image || !mimeType) {
            res.status(400).json({ message: 'Image and mimeType are required' });
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(mimeType)) {
            res.status(400).json({ message: 'Invalid image type. Allowed: jpeg, png, webp, gif' });
            return;
        }

        const ticketData = await aiService.analyzeImage(image, mimeType);

        if (!ticketData.isValid) {
            res.status(400).json({
                success: false,
                isValid: false,
                message: ticketData.rejectionReason || 'The image does not show physical damage or equipment failure. Please upload a different image.',
            });
            return;
        }

        res.status(200).json({
            success: true,
            isValid: true,
            data: {
                title: ticketData.title,
                description: ticketData.description,
                priority: ticketData.priority,
                tags: ticketData.tags,
            },
        });
    } catch (error: any) {
        if (error.message === 'INVALID_AI_RESPONSE') {
            res.status(500).json({ message: 'Failed to analyze image. Please try again.' });
            return;
        }
        console.error('Error generating ticket:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};