import { useNavigate } from 'react-router-dom';
import { Building, Users } from 'lucide-react';
import Button from '../common/Button';

interface AdminSectionProps {
    isMobile: boolean;
}

export default function AdminSection({ isMobile }: AdminSectionProps) {
    const navigate = useNavigate();

    // Only render on mobile as per existing logic
    if (!isMobile) return null;

    return (
        <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
            <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-main mb-4">
                Admin Management
            </h3>
            <div className="flex flex-col gap-3">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate('/offices')}
                    className="flex items-center justify-center gap-2"
                >
                    <Building className="w-4 h-4" />
                    Manage Offices
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate('/users')}
                    className="flex items-center justify-center gap-2"
                >
                    <Users className="w-4 h-4" />
                    Manage Users
                </Button>
            </div>
        </div>
    );
}
