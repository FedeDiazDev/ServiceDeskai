import { useState } from "react";
import { useCreateUserMutation } from '../services/usersApi';
import { toast } from 'react-hot-toast';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<'user' | 'service' | 'admin'>('user');
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [office, setOffice] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [createUser] = useCreateUserMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const payload: any = { name, surname, email, password, role };
            if (office) payload.office = { _id: office };
            await createUser(payload).unwrap();
            toast.success('User created successfully');
            setName(""); setEmail(""); setRole('user'); setOffice("");
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || 'Error creating user');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text-main">Create User</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    label="Name"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    label="Surname"
                    placeholder="Surname"
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
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
                <Input
                    type="password"
                    label="Password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <select
                    value={role}
                    onChange={e => setRole(e.target.value as any)}
                    className="px-3 py-2 border rounded text-sm bg-white dark:bg-dark-bg  text-gray-900 dark:text-dark-text-main"
                >
                    <option value="user">User</option>
                    <option value="service">Service Desk</option>
                    <option value="admin">Admin</option>
                </select>
                {/* <Input
                    type="text"
                    label="Office ID (optional)"
                    placeholder="Office ID (optional)"
                    value={office}
                    onChange={e => setOffice(e.target.value)}
                /> */}
                <Button type="submit" isLoading={isLoading}>Create User</Button>

            </form>
        </div>
    );
}
