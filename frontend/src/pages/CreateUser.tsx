import { useState } from "react";
import { useCreateUserMutation } from '../services/usersApi';
import { toast } from 'react-hot-toast';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<'user' | 'service' | 'admin'>('user');
    const [office, setOffice] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [createUser] = useCreateUserMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const payload: any = { name, email, role };
            if (office) payload.office = { _id: office };
            await createUser(payload).unwrap();
            toast.success('Usuario creado correctamente');
            setName(""); setEmail(""); setRole('user'); setOffice("");
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || 'Error al crear usuario');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text-main">Crear usuario</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    label="Nombre"
                    placeholder="Nombre"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    label="Email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <select
                    value={role}
                    onChange={e => setRole(e.target.value as any)}
                    className="px-3 py-2 border rounded text-sm bg-white dark:bg-dark-bg  text-gray-900 dark:text-dark-text-main"
                >
                    <option value="user">Usuario</option>
                    <option value="service">Service Desk</option>
                    <option value="admin">Administrador</option>
                </select>
                <Input
                    type="text"
                    label="ID de oficina (opcional)"
                    placeholder="ID de oficina (opcional)"
                    value={office}
                    onChange={e => setOffice(e.target.value)}
                />
                <Button type="submit" isLoading={isLoading}>Crear usuario</Button>
            </form>
        </div>
    );
}
