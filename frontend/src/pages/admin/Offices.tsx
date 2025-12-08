import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OfficeCard from '../../components/admin/OfficeCard';
import { useGetOfficesQuery, useCreateOfficeMutation } from '../../services/officesApi';

const Offices = () => {
    const [search, setSearch] = useState('');
    const { data: offices, isLoading, isError } = useGetOfficesQuery();
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
                <p className="text-status-high-text">Error al cargar las oficinas</p>
            </div>
        );
    }

    const filtered = offices?.filter((o) => o.name.toLowerCase().includes(search.toLowerCase())) ?? [];

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main">Oficinas</h1>
                <input
                    className="px-3 py-1 border rounded text-sm"
                    placeholder="Buscar oficina"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-dark-text-muted">No hay oficinas registradas</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {filtered.map((office) => (
                        <OfficeCard key={office._id} {...office} />
                    ))}
                </div>
            )}
            <div className="mt-6">
                <button
                    className="px-3 py-2 bg-primary-600 text-white rounded"
                    onClick={() => navigate('/offices/new')}
                >Nueva oficina</button>
            </div>
        </div>
    );
};

export default Offices;
