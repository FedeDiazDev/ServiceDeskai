import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateTicketMutation } from '../services/ticketsApi';
import { useAnalyzeImageMutation } from '../services/aiApi';
import { GeneratedTicketData } from '../services/aiApi';
import { useGetOfficesForCityQuery, getUserLocation, UserLocation } from '../services/geolocationApi';
import { Office } from '../services/officeService';
import Button from "../components/common/Button";
import ImageDropzone from "../components/tickets/ImageDropzone";
import ImagePreview from "../components/tickets/ImagePreview";
import TicketSummary from "../components/tickets/TicketSummary";
import { MapPin, Building2, ChevronDown, Navigation } from "lucide-react";

export default function NewTicket() {
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const [ticketData, setTicketData] = useState<GeneratedTicketData | null>(null);
    const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
    const [detectedCity, setDetectedCity] = useState<string | undefined>(undefined);
    const [locationSource, setLocationSource] = useState<'gps' | 'ip' | 'none'>('none');
    const [isDetectingCity, setIsDetectingCity] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isRejection, setIsRejection] = useState(false);

    const [createTicket, { isLoading: creating }] = useCreateTicketMutation();
    const [analyzeImageMutation, { isLoading: analyzeLoading }] = useAnalyzeImageMutation();

    const { data: locationData, isLoading: isLoadingOffices } = useGetOfficesForCityQuery(detectedCity, {
        skip: isDetectingCity
    });

    useEffect(() => {
        const detectLocation = async () => {
            setIsDetectingCity(true);
            const location = await getUserLocation();
            setDetectedCity(location.city || undefined);
            setLocationSource(location.source);
            setIsDetectingCity(false);
        };
        detectLocation();
    }, []);

    useEffect(() => {
        if (locationData?.offices && locationData.offices.length === 1) {
            setSelectedOffice(locationData.offices[0]);
        }
    }, [locationData]);

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
                toast.success('Image analyzed successfully');
            } else {
                setError(result?.message || 'Image was rejected by AI');
                setIsRejection(true);
            }
        } catch (err: any) {
            const status = err?.status;
            const data = err?.data;
            if (data?.isValid === false) {
                setError(data?.message || 'Image was rejected by AI');
                setIsRejection(true);
            } else {
                setError(data?.message || err.message || 'Error analyzing image');
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
                office: selectedOffice?._id,
            }).unwrap();
            toast.success('Ticket created successfully');
            navigate('/tickets');
        } catch (err: any) {
            const msg = err.data?.message || err.message || 'Error creating ticket';
            setError(msg);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const isLoadingLocation = isDetectingCity || isLoadingOffices;

    const renderOfficeSelector = () => {
        if (isLoadingLocation) {
            return (
                <div className="bg-gray-50 dark:bg-dark-bg/50 rounded-xl p-4 flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                    <span className="text-gray-600 dark:text-dark-text-muted">Detecting your location...</span>
                </div>
            );
        }

        if (!locationData?.offices || locationData.offices.length === 0) {
            return (
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <span className="text-amber-700 dark:text-amber-400">No offices available</span>
                </div>
            );
        }

        const offices = locationData.offices;
        const matchedByCity = locationData.matchedByCity;
        const cityName = detectedCity || locationData.city;

        return (
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <h3 className="font-medium text-gray-900 dark:text-dark-text-main">
                        Office Assignment
                    </h3>
                </div>

                {cityName && (
                    <div className="flex items-center gap-2 mb-3 text-sm">
                        {locationSource === 'gps' ? (
                            <Navigation className="w-4 h-4 text-green-500" />
                        ) : (
                            <MapPin className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-gray-600 dark:text-dark-text-muted">
                            Detected location: <span className="font-medium text-gray-900 dark:text-dark-text-main">{cityName}</span>
                            <span className="ml-2 text-xs text-gray-400">
                                ({locationSource === 'gps' ? 'GPS' : 'IP-based'})
                            </span>
                        </span>
                    </div>
                )}

                {offices.length === 1 ? (
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <Building2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <div>
                            <p className="font-medium text-green-800 dark:text-green-300">{offices[0].name}</p>
                            <p className="text-sm text-green-600 dark:text-green-400">{offices[0].location}</p>
                        </div>
                        {matchedByCity && (
                            <span className="ml-auto text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                                Auto-assigned
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-dark-text-muted mb-2">
                            {matchedByCity
                                ? `${offices.length} offices found in your city. Please select one:`
                                : `Select an office for your ticket:`
                            }
                        </p>
                        <div className="relative">
                            <select
                                value={selectedOffice?._id || ''}
                                onChange={(e) => {
                                    const office = offices.find(o => o._id === e.target.value);
                                    setSelectedOffice(office || null);
                                }}
                                className="w-full appearance-none bg-gray-100 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg p-3 pr-10 text-gray-900 dark:text-dark-text-main font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="">Select an office...</option>
                                {offices.map((office) => (
                                    <option key={office._id} value={office._id}>
                                        {office.name} - {office.city}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main mb-6">
                New Ticket
            </h1>

            <div className="mb-6">
                {renderOfficeSelector()}
            </div>

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
                            disabled={locationData?.offices && locationData.offices.length > 1 && !selectedOffice}
                        >
                            Confirm and create
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
