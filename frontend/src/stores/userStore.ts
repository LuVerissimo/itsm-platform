import { create } from 'zustand';
import { User } from '../features/users/types';
import { UserFormData } from '../features/users/types/userSchema';

interface UserState {
    currentUser: User | null;
    loading: boolean;
    checkAuth: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    users: User[];
    editingUser: User | null;
    isModalOpen: boolean;
    openEditModal: (user: User) => void;
    closeEditModal: () => void;
    fetchUsers: () => Promise<void>;
    addUser: (newUser: UserFormData) => Promise<void>;
    updateUser: (userId: string, updateUser: UserFormData) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
    currentUser: null,
    loading: true,
    checkAuth: async () => {
        try {
            const response = await fetch('http://localhost:4000/api/users/me', {
                credentials: 'include',
            });
            if (response.ok) {
                const { data } = await response.json();
                set({ currentUser: data, loading: false });
            } else {
                throw new Error('Not authenticated');
            }
        } catch (error) {
            set({ currentUser: null, loading: false });
        }
    },

    login: async (email: string, password: string) => {
        const response = await fetch('http://localhost:4000/api/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });
        if (response.ok) {
            const { data } = await response.json();
            set({ currentUser: data, loading: false });
        } else {
            alert('Login failed');
        }
    },

    logout: async () => {
        await fetch('http://localhost:4000/api/sessions', {
            method: 'DELETE',
            credentials: 'include',
        });
        set({ currentUser: null, loading: false });
        window.location.reload();
    },

    users: [],
    editingUser: null,
    isModalOpen: false,

    openEditModal: (user) => {
        set({ isModalOpen: true, editingUser: user });
    },
    closeEditModal: () => set({ isModalOpen: false, editingUser: null }),

    fetchUsers: async () => {
        const response = await fetch('http://localhost:4000/api/users');
        const { data } = await response.json();
        set({ users: data });
    },

    addUser: async (newUser) => {
        const response = await fetch('http://localhost:4000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: newUser }),
        });
        const { data } = await response.json();
        set((state) => ({ users: [...state.users, data] }));
    },

    updateUser: async (userId: string, updateUser: UserFormData) => {
        const response = await fetch(
            `http://localhost:4000/api/users/${userId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: updateUser }),
            }
        );
        const { data } = await response.json();
        set((state) => ({
            users: state.users.map((user) =>
                user.id === userId ? data : user
            ),
        }));
    },

    deleteUser: async (userId: string) => {
        await fetch(`http://localhost:4000/api/users/${userId}`, {
            method: 'DELETE',
        });
        set((state) => ({
            users: state.users.filter((user) => user.id !== userId),
        }));
    },
}));
