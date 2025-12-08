import { useState } from "react";
import { useCreateOfficeMutation } from '../services/officesApi';
import { toast } from 'react-hot-toast';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function CreateOffice() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [createOffice] = useCreateOfficeMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await createOffice({ name, address }).unwrap();
            toast.success('Oficina creada correctamente');
            setName(""); setAddress("");
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || 'Error al crear oficina');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text-main">Crear oficina</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    label="Nombre de la oficina"
                    placeholder="Nombre de la oficina"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    label="Dirección (opcional)"
                    placeholder="Dirección (opcional)"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <Button type="submit" isLoading={isLoading}>Crear oficina</Button>
            </form>
        </div>
    );
}
