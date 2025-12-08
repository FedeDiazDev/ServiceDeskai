import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OfficeCard from '../../components/admin/OfficeCard';
import { useGetOfficesQuery, useCreateOfficeMutation } from '../../services/officesApi';
import { Search } from 'lucide-react';

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
                <p className="text-status-high-text">Error loading offices</p>
            </div>
        );
    }

    const filtered = offices?.filter((o) => o.name.toLowerCase().includes(search.toLowerCase())) ?? [];

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main">Offices</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-dark-text-muted" />
                    <input
                        className="pl-9 pr-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg text-sm bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text-main focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors w-48"
                        placeholder="Search office..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-dark-text-muted">No offices registered</p>
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
                >New office</button>
            </div>
        </div>
    );
};

export default Offices;
