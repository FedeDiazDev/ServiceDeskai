import { X } from "lucide-react";

interface ImagePreviewProps {
    src: string;
    onRemove: () => void;
    isLoading?: boolean;
    loadingText?: string;
}

export default function ImagePreview({ src, onRemove, isLoading, loadingText = "Processing..." }: ImagePreviewProps) {
    return (
        <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden">
            <div className="relative">
                <img
                    src={src}
                    alt="Preview"
                    className="w-full max-h-64 object-contain bg-gray-100 dark:bg-dark-bg"
                />
                <button
                    onClick={onRemove}
                    className="absolute top-2 right-2 p-1.5 bg-white dark:bg-dark-surface rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-dark-border transition-colors"
                    aria-label="Remove image"
                >
                    <X className="w-4 h-4 text-gray-600 dark:text-dark-text-muted" />
                </button>
            </div>
            
            {isLoading && (
                <div className="p-6 flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                    <span className="text-gray-600 dark:text-dark-text-muted">
                        {loadingText}
                    </span>
                </div>
            )}
        </div>
    );
}
