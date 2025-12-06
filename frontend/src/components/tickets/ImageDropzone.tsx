import { useRef } from "react";
import { Upload, Sparkles } from "lucide-react";

interface ImageDropzoneProps {
    onImageSelect: (file: File) => void;
}

export default function ImageDropzone({ onImageSelect }: ImageDropzoneProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            onImageSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageSelect(file);
        }
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-xl p-12 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors"
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
            />
            <Upload className="w-12 h-12 mx-auto text-gray-400 dark:text-dark-text-muted mb-4" />
            <p className="text-lg font-medium text-gray-700 dark:text-dark-text-main mb-2">
                Upload a screenshot of the issue
            </p>
            <p className="text-sm text-gray-500 dark:text-dark-text-muted">
                Drag an image or click to select
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-primary-600 dark:text-primary-400">
                <Sparkles className="w-4 h-4" />
                <span>AI will analyze the image and create the ticket for you</span>
            </div>
        </div>
    );
}
