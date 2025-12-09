import { User, Mail, Shield, Building } from 'lucide-react';

interface UserProfile {
    name: string;
    surname: string;
    email: string;
    officeName: string;
    role: string;
    office?: string | { name: string };
}

interface ProfileCardProps {
    user: UserProfile | null;
}

export default function ProfileCard({ user }: ProfileCardProps) {
    if (!user) return null;

    const initials = `${user.name?.[0] || ''}${user.surname?.[0] || ''}`.toUpperCase();
    const officeName = typeof user.office === 'string' ? user.officeName : user.office?.name;

    return (
        <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
            <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400 text-xl font-bold">
                    {initials}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text-main">
                        {user.name} {user.surname}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-dark-text-muted">
                        Personal Information
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-dark-bg/50">
                    <User className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 dark:text-dark-text-muted">Full Name</p>
                        <p className="font-medium text-gray-900 dark:text-dark-text-main">
                            {user.name} {user.surname}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-dark-bg/50">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 dark:text-dark-text-muted">Email Address</p>
                        <p className="font-medium text-gray-900 dark:text-dark-text-main">
                            {user.email}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-dark-bg/50">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 dark:text-dark-text-muted">Role</p>
                        <p className="font-medium text-gray-900 dark:text-dark-text-main capitalize">
                            {user.role}
                        </p>
                    </div>
                </div>

                {officeName && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-dark-bg/50">
                        <Building className="w-5 h-5 text-gray-400" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 dark:text-dark-text-muted">Office</p>
                            <p className="font-medium text-gray-900 dark:text-dark-text-main">
                                {officeName}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
