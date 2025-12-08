import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateTicketMutation } from '../services/ticketsApi';
import { useAnalyzeImageMutation } from '../services/aiApi';
import { GeneratedTicketData } from '../services/aiApi';
import { Geolocation } from "../types/ticket";
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
    const [geolocation, setGeolocation] = useState<Geolocation | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isRejection, setIsRejection] = useState(false);

    const [createTicket, { isLoading: creating }] = useCreateTicketMutation();
    const [analyzeImageMutation, { isLoading: analyzeLoading }] = useAnalyzeImageMutation();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGeolocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                    });
                },
                (error) => {
                    console.warn('Geolocation error:', error.message);
                }
            );
        }
    }, []);

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
            const imageDataUrl = await imageToBase64(file);
            const base64 = imageDataUrl.split(',')[1];
            const result = await analyzeImageMutation({ image: base64, mimeType: file.type }).unwrap();

            if (result?.isValid && result.data) {
                setTicketData(result.data);
                toast.success('Imagen analizada correctamente');
            } else {
                setError(result?.message || 'La imagen fue rechazada por la IA');
                setIsRejection(true);
            }
        } catch (err: any) {
            const status = err?.status;
            const data = err?.data;
            if (data?.isValid === false) {
                setError(data?.message || 'La imagen fue rechazada por la IA');
                setIsRejection(true);
                // La preview se mantiene para que el usuario vea la imagen rechazada
            } else {
                setError(data?.message || err.message || 'Error analizando la imagen');
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

    const imageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async () => {
        if (!ticketData || !imageFile) return;
        setError(null);
        setIsLoading(true);

        try {
            const imageBase64 = await imageToBase64(imageFile);
            await createTicket({
                ...ticketData,
                attachments: [imageBase64],
                geolocation: geolocation || undefined,
            }).unwrap();
            toast.success('Ticket creado correctamente');
            navigate('/tickets');
        } catch (err: any) {
            const msg = err.data?.message || err.message || 'Error creando ticket';
            setError(msg);
            toast.error(msg);
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
