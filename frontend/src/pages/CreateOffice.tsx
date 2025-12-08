import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOfficeMutation } from '../services/officesApi';
import { toast } from 'react-hot-toast';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Building2, MapPin, Phone, ArrowLeft } from 'lucide-react';

export default function CreateOffice() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [createOffice] = useCreateOfficeMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await createOffice({ name, city, location, phone }).unwrap();
            toast.success('Office created successfully');
            navigate('/offices');
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || 'Error creating office');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto pt-6">
            <button
                onClick={() => navigate('/offices')}
                className="inline-flex items-center gap-2 text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 mb-4 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Offices
            </button>

            <div className="p-6 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-dark-text-main">Create Office</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        label="Office Name"
                        placeholder="Main Office"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        icon={Building2}
                        required
                    />
                    <Input
                        type="text"
                        label="City"
                        placeholder="City name (for geolocation matching)"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        icon={MapPin}
                        required
                    />
                    <Input
                        type="text"
                        label="Address"
                        placeholder="Full address"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        icon={MapPin}
                        required
                    />
                    <Input
                        type="tel"
                        label="Phone"
                        placeholder="+34 911 234 567"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        icon={Phone}
                        required
                    />
                    <Button type="submit" isLoading={isLoading} className="mt-2">
                        Create Office
                    </Button>
                </form>
            </div>
        </div>
    );
}
