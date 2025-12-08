import { useState } from "react";
import { useCreateOfficeMutation } from '../services/officesApi';
import { toast } from 'react-hot-toast';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function CreateOffice() {
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
            setName(""); setCity(""); setLocation(""); setPhone("");
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || 'Error creating office');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text-main">Create Office</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    label="Office Name"
                    placeholder="Office Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    label="City"
                    placeholder="City name (for geolocation matching)"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    label="Location"
                    placeholder="Full address"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    label="Phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                />
                <Button type="submit" isLoading={isLoading}>Create Office</Button>
            </form>
        </div>
    );
}
