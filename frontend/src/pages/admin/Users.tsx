import { useState } from 'react';
import UserCard from '../../components/admin/UserCard';
import { useGetUsersQuery, useCreateUserMutation } from '../../services/usersApi';


const Users = () => {
    const [search, setSearch] = useState('');
    const { data: users, isLoading, isError } = useGetUsersQuery();
    const [createUser] = useCreateUserMutation();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-8">
                <p className="text-status-high-text">Error al cargar los usuarios</p>
            </div>
        );
    }

    const filtered = users?.filter((u) => {
        const surname = (u as any).surname || '';
        const full = `${u.name} ${surname}`.toLowerCase();
        return full.includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    }) ?? [];

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main">Usuarios</h1>
                <input
                    className="px-3 py-1 border rounded text-sm"
                    placeholder="Buscar usuario"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-dark-text-muted">No hay usuarios registrados</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {filtered.map((user) => (
                        <UserCard key={user._id} {...user} />
                    ))}
                </div>
            )}
            <div className="mt-6">
                <button
                    className="px-3 py-2 bg-primary-600 text-white rounded"
                    onClick={async () => {
                        const name = prompt('Nombre completo del usuario');
                        const email = prompt('Email');
                        const roleInput = prompt('Rol (user, service, admin)', 'user');
                        const role = (roleInput || 'user') as any;
                        if (!name || !email) return alert('Nombre y email son requeridos');
                        try {
                            await createUser({ name, email, role }).unwrap();
                        } catch (e: any) {
                            alert(e?.data?.message || e?.message || 'Error al crear usuario');
                        }
                    }}
                >Nuevo usuario</button>
            </div>
        </div>
    );
};

export default Users;
