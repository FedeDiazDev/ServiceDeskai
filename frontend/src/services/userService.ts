export interface User {
    _id: string;
    name: string;
    surname: string;
    email: string;
    role: 'user' | 'service' | 'admin';
    office?: {
        _id: string;
        name: string;
    };
    officeName: string;
    createdAt: string;
    updatedAt: string;
}
