
export interface User {
    id: string;
    name: string;
    email: string;
}

export interface userState {
    users: User[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success'
}