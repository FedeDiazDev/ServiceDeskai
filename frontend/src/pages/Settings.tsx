import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import ProfileCard from '../components/settings/ProfileCard';
import AdminSection from '../components/settings/AdminSection';

export default function Settings() {
    const { user } = useAuth();    
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex flex-col gap-2 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main">
                    Settings
                </h2>
                <p className="text-gray-500 dark:text-dark-text-muted">
                    Manage your profile information and preferences
                </p>
            </div>

            <ProfileCard user={user} />

            {user?.role === 'admin' && (
                <AdminSection isMobile={isMobile} />
            )}
        </div>
    );
}
