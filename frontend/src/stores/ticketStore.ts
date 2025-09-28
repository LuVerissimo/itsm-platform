import { create } from 'zustand';
import { Ticket } from '../features/tickets/types';

interface TicketState {
    tickets: Ticket[];
    fetchTickets: () => Promise<void>;
}

export const useTicketStore = create<TicketState>((set, get) => ({
    tickets: [],

    fetchTickets: async () => {
        try {
            const response = await fetch('http://localhost:4000/api/tickets');
            if (!response.ok) {
                throw new Error('Failed to fetch tickets');
            }
            const { data } = await response.json();
            set({ tickets: data });
        } catch (error) {
            console.error('Failed to fetch tickets:', error);
        }
    },
}));
