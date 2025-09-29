import { create } from 'zustand';
import { Ticket } from '../features/tickets/types';
import { TicketFormData } from '../features/tickets/types/ticketSchema';

interface TicketState {
    tickets: Ticket[];
    fetchTickets: () => Promise<void>;
    addTicket: (ticket: TicketFormData, userId: string) => Promise<void>;
    updateTicket: (
        ticketId: string,
        updatedTicket: TicketFormData,
        userId: string
    ) => Promise<void>;
    deleteTicket: (ticketId: string) => Promise<void>;
}

export const useTicketStore = create<TicketState>((set, get) => ({
    tickets: [],

    fetchTickets: async () => {
        try {
            const response = await fetch('http://localhost:4000/api/tickets', {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch tickets');
            }
            const { data } = await response.json();
            set({ tickets: data });
        } catch (error) {
            console.error('Failed to fetch tickets:', error);
        }
    },

    addTicket: async (newTicket, userId) => {
        try {
            const payload = { ...newTicket, user_id: userId };

            const response = await fetch('http://localhost:4000/api/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticket: payload }),
                credentials: 'include',
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

    updateTicket: async (ticketId, updatedData, userId) => {
        try {
            const payload = { ...updatedData, user_id: userId };

            const response = await fetch(
                `http://localhost:4000/api/tickets/${ticketId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ticket: payload }),
                    credentials: 'include',
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update ticket');
            }
            const { data: updatedTicket } = await response.json();
            set((state) => ({
                tickets: state.tickets.map((ticket) =>
                    ticket.id === ticketId ? updatedTicket : ticket
                ),
            }));
        } catch (error) {
            console.error('Error updating ticket');
        }
    },

    deleteTicket: async (ticketId) => {
        try {
            const response = await fetch(
                `http://localhost:4000/api/tickets/${ticketId}`,
                {
                    method: 'DELETE',
                }
            );

            if (!response.ok) {
                throw new Error('Failed to delete ticket');
            }
            set((state) => ({
                tickets: state.tickets.filter(
                    (ticket) => ticket.id !== ticketId
                ),
            }));
        } catch (error) {
            console.error('Error updating ticket');
        }
    },
}));
