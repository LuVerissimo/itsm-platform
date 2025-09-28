import { useEffect, useState } from 'react';
import { useTicketStore } from '../../../stores/ticketStore';
import { TicketForm } from './TicketForm';
import { Ticket } from '../types';
import { Button } from '../../../components/Button';
import { EditTicketModal } from './EditTicketModal';

export const TicketList = () => {
    const { tickets, fetchTickets, addTicket, deleteTicket } = useTicketStore();
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleEditClick = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setEditModalOpen(true);
    };

    const handleDelete = (ticketId: string) => {
        if (window.confirm('Are you sure you want to delete this ticket?')) {
            deleteTicket(ticketId);
        }
    };
    return (
        <div className="p-4 md:p-8">
            <TicketForm onAddTicket={addTicket} />

            <h1 className="my-4 text-2xl font-bold text-slate-800">Tickets</h1>

            <div className="space-y-4">
                {tickets.length > 0 ? (
                    tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="p-4 bg-white rounded-lg shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="font-bold text-slate-900">
                                    {ticket.title}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                                        {ticket.status}
                                    </span>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                handleEditClick(ticket)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() =>
                                                handleDelete(ticket.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">
                                {ticket.description}
                            </p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-500">
                                    Created by:{' '}
                                    {ticket.user ? ticket.user.name : 'N/A'}
                                </span>
                                <span className="text-xs font-medium text-slate-500">
                                    Priority: {ticket.priority}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-500">
                        No tickets found. Create one to get started!
                    </p>
                )}
            </div>

            <EditTicketModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                ticket={selectedTicket}
            />
        </div>
    );
};
