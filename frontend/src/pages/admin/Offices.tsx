import { useEffect, useState } from 'react';
import { officeService, Office } from '../../services/officeService';
import OfficeCard from '../../components/admin/OfficeCard';

const Offices = () => {
    const [offices, setOffices] = useState<Office[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const data = await officeService.getAll();
                setOffices(data);
            } catch (err) {
                setError('Error al cargar las oficinas');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOffices();
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
                Oficinas
            </h1>
            
            {offices.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-dark-text-muted">No hay oficinas registradas</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {offices.map((office) => (
                        <OfficeCard
                            key={office._id}
                            {...office}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Offices;
