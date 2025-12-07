import { useEffect, useState } from 'react';
import { userService, User } from '../../services/userService';
import UserCard from '../../components/admin/UserCard';

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userService.getAll();
                setUsers(data);
            } catch (err) {
                setError('Error al cargar los usuarios');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-status-high-text">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main mb-6">
                Usuarios
            </h1>
            
            {users.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-dark-text-muted">No hay usuarios registrados</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {users.map((user) => (
                        <UserCard
                            key={user._id}
                            {...user}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Users;
