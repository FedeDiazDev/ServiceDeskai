import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ticketService } from "../services/ticketService";
import { aiService, GeneratedTicketData, ImageRejectedError } from "../services/aiService";
import Button from "../components/common/Button";
import ImageDropzone from "../components/tickets/ImageDropzone";
import ImagePreview from "../components/tickets/ImagePreview";
import TicketSummary from "../components/tickets/TicketSummary";

export default function NewTicket() {
    const navigate = useNavigate();
    
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    
    const [ticketData, setTicketData] = useState<GeneratedTicketData | null>(null);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isRejection, setIsRejection] = useState(false);

    const handleImageSelect = (file: File) => {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setTicketData(null);
        setError(null);
        setIsRejection(false);
        analyzeImage(file);
    };

    const analyzeImage = async (file: File) => {
        setIsAnalyzing(true);
        setError(null);
        setIsRejection(false);
        
        try {
            const data = await aiService.analyzeImage(file);
            setTicketData(data);
        } catch (err: any) {
            if (err instanceof ImageRejectedError) {
                setError(err.message);
                setIsRejection(true);
            } else {
                setError(err.response?.data?.message || 'Error analyzing image');
                setImagePreview(null);
                setImageFile(null);
            }
        } finally {
            setIsAnalyzing(false);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setTicketData(null);
        setError(null);
        setIsRejection(false);
    };

    const handleSubmit = async () => {
        if (!ticketData) return;
        
        setError(null);
        setIsLoading(true);

        try {
            await ticketService.create(ticketData);
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

            {!imagePreview && !error && (
                <ImageDropzone onImageSelect={handleImageSelect} />
            )}

            {error && !imagePreview && (
                <div className="flex flex-col gap-4">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                        <p className="text-red-700 dark:text-red-400">{error}</p>
                    </div>
                    <ImageDropzone onImageSelect={handleImageSelect} />
                </div>
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

            {isRejection && imagePreview && (
                <div className="flex flex-col gap-4">
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                        <p className="text-amber-700 dark:text-amber-400 font-medium mb-1">
                            Invalid image
                        </p>
                        <p className="text-amber-600 dark:text-amber-500 text-sm">
                            {error}
                        </p>
                    </div>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={removeImage}
                    >
                        Upload a different image
                    </Button>
                </div>
            )}

            {ticketData && (
                <div className="flex flex-col gap-4">
                    <TicketSummary
                        title={ticketData.title}
                        description={ticketData.description}
                        priority={ticketData.priority}
                    />

                    {error && !isRejection && (
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
