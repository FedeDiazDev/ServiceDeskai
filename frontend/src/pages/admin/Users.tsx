import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../../components/admin/UserCard';
import { useGetUsersQuery, useCreateUserMutation } from '../../services/usersApi';


const Users = () => {
    const [search, setSearch] = useState('');
    const { data: users, isLoading, isError } = useGetUsersQuery();
    const navigate = useNavigate();

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
                <p className="text-status-high-text">Error loading users</p>
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main">Users</h1>
                <input
                    className="px-3 py-1 border rounded text-sm"
                    placeholder="Search user"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-dark-text-muted">No users registered</p>
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
                    onClick={() => navigate('/users/new')}
                >New user</button>
            </div>
        </div>
    );
};

export default Users;
