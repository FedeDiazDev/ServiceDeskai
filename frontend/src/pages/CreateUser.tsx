import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from '../services/usersApi';
import { useGetOfficesQuery } from '../services/officesApi';
import { toast } from 'react-hot-toast';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { User, Mail, Lock, Building2, Shield, ArrowLeft } from 'lucide-react';

export default function CreateUser() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<'user' | 'service' | 'admin'>('user');
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [selectedOffice, setSelectedOffice] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [createUser] = useCreateUserMutation();
    const { data: offices } = useGetOfficesQuery();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const payload: any = { name, surname, email, password, role };
            if (selectedOffice) payload.office = selectedOffice;
            await createUser(payload).unwrap();
            toast.success('User created successfully');
            navigate('/users');
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || 'Error creating user');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto pt-6">
            <button
                onClick={() => navigate('/users')}
                className="inline-flex items-center gap-2 text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 mb-4 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Users
            </button>

            <div className="p-6 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-dark-text-main">Create User</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        label="Name"
                        placeholder="First name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        icon={User}
                        required
                    />
                    <Input
                        type="text"
                        label="Surname"
                        placeholder="Last name"
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                        icon={User}
                        required
                    />
                    <Input
                        type="email"
                        label="Email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        icon={Mail}
                        required
                    />
                    <Input
                        type="password"
                        label="Password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        icon={Lock}
                        required
                    />

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700 dark:text-dark-text-muted flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Role
                        </label>
                        <select
                            value={role}
                            onChange={e => setRole(e.target.value as any)}
                            className="w-full px-3 py-2.5 border border-gray-300 dark:border-dark-border rounded-lg text-sm bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text-main focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        >
                            <option value="user">User</option>
                            <option value="service">Service Desk</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700 dark:text-dark-text-muted flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Office
                        </label>
                        <select
                            value={selectedOffice}
                            onChange={e => setSelectedOffice(e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-300 dark:border-dark-border rounded-lg text-sm bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text-main focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        >
                            <option value="">Select office (optional)</option>
                            {offices?.map((office) => (
                                <option key={office._id} value={office._id}>
                                    {office.name} - {office.city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button type="submit" isLoading={isLoading} className="mt-2">
                        Create User
                    </Button>
                </form>
            </div>
        </div>
    );
}
