import { useEffect } from 'react';
import { useTicketStore } from '../../../stores/ticketStore';

export const TicketList = () => {
    const { tickets, fetchTickets } = useTicketStore();

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Tickets</h1>
            <div className="space-y-4">
                {tickets.length > 0 ? (
                    tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="p-4 bg-white rounded-lg shadow-md"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="font-bold text-slate-900">
                                    {ticket.title}
                                </h2>
                                <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
                                    {ticket.status}
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">
                                {ticket.description}
                            </p>
                            <div className="mt-4">
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
        </div>
    );
};
