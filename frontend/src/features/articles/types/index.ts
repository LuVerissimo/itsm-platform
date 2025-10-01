interface BasicUser {
    id: string;
    name: string;
}

export interface Article {
    id: string;
    title: string;
    content: string;
    user: BasicUser | null;
}
