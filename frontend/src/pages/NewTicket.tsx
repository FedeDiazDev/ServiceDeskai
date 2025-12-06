import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ticketService } from "../services/ticketService";
import { TicketPriority } from "../types/ticket";
import Button from "../components/common/Button";
import ImageDropzone from "../components/tickets/ImageDropzone";
import ImagePreview from "../components/tickets/ImagePreview";
import TicketSummary from "../components/tickets/TicketSummary";

export default function NewTicket() {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // Estados de imagen
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    
    // AI-generated data (read-only)
    const [ticketData, setTicketData] = useState<{
        title: string;
        description: string;
        priority: TicketPriority;
    } | null>(null);
    
    // Estados del formulario
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageSelect = (file: File) => {
        setImagePreview(URL.createObjectURL(file));
        setTicketData(null);
        analyzeImage(file);
    };

    const analyzeImage = async (file: File) => {
        setIsAnalyzing(true);
        setError(null);
        
        // TODO: Call backend to analyze with AI
        // For now we simulate a delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulated AI data
        setTicketData({
            title: 'Application Error',
            description: 'The application shows an error message when trying to perform the operation. The user cannot continue with the process.',
            priority: 'high',
        });
        
        setIsAnalyzing(false);
    };

    const removeImage = () => {
        setImagePreview(null);
        setTicketData(null);
        setError(null);
    };

    const handleSubmit = async () => {
        if (!ticketData) return;
        
        setError(null);
        setIsLoading(true);

        try {
            await ticketService.create({
                ...ticketData,
                createdBy: { name: user?.name || '', surname: user?.surname || '' },
            });
            navigate('/tickets');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error creating ticket');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main mb-6">
                New Ticket
            </h1>

            {!imagePreview && (
                <ImageDropzone onImageSelect={handleImageSelect} />
            )}

            {imagePreview && (
                <div className="mb-4">
                    <ImagePreview
                        src={imagePreview}
                        onRemove={removeImage}
                        isLoading={isAnalyzing}
                        loadingText="Analyzing image with AI..."
                    />
                </div>
            )}

            {ticketData && (
                <div className="flex flex-col gap-4">
                    <TicketSummary
                        title={ticketData.title}
                        description={ticketData.description}
                        priority={ticketData.priority}
                    />

                    {error && (
                        <p className="text-status-high-text text-sm">{error}</p>
                    )}

                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={removeImage}
                        >
                            Upload another image
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            isLoading={isLoading}
                        >
                            Confirm and create
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
