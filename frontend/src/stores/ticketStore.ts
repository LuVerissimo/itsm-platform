import { create } from 'zustand';
import { Ticket } from '../features/tickets/types';
import { TicketFormData } from '../features/tickets/types/ticketSchema';

interface TicketState {
    tickets: Ticket[];
    fetchTickets: () => Promise<void>;
    addTicket: (ticket: TicketFormData) => Promise<void>;
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

    addTicket: async (newTicket) => {
        try {
            const response = await fetch('http://localhost:4000/api/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticket: newTicket }),
            });
            if (!response.ok) {
                throw new Error('Error creating ticket');
            }
            const { data } = await response.json();
            set((state) => ({ tickets: [...state.tickets, data] }));
        } catch (error) {
            console.error('Failed to create ticket: ', error);
        }
    },
}));
