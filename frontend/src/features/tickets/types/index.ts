interface BasicUser {
    id: string;
    name: string;
}

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'in_progress' | 'closed';
    priority: 'low' | 'medium' | 'high';
    user: BasicUser | null;
}
