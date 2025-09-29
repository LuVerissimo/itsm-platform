import { zodResolver } from '@hookform/resolvers/zod';
import { useTicketStore } from '../../../stores/ticketStore';
import { TicketFormData, ticketSchema } from '../types/ticketSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Ticket } from '../types';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../../../components/Button';
import { useUserStore } from '../../../stores/userStore';

interface EditTicketModalProps {
    ticket: Ticket | null;
    isOpen: boolean;
    onClose: () => void;
}

export const EditTicketModal = ({
    ticket,
    isOpen,
    onClose,
}: EditTicketModalProps) => {
    const { updateTicket } = useTicketStore();
    const { currentUser} = useUserStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TicketFormData>({
        resolver: zodResolver(ticketSchema),
    });

    useEffect(() => {
        if (ticket) {
            reset(ticket);
        }
    }, [ticket, reset]);

    const onSubmit: SubmitHandler<TicketFormData> = (data) => {
        if (ticket && currentUser) {
            updateTicket(ticket.id, data, currentUser.id);
            onClose();
        } else {
            alert("No user is logged in.")
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
                    <Dialog.Title className="text-xl font-semibold text-slate-800">
                        Edit Ticket
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-slate-600">
                        Update the ticket details below.
                    </Dialog.Description>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-6 space-y-4"
                    >
                        <div>
                            <label
                                htmlFor="title-edit"
                                className="mb-1 block text-sm font-medium text-slate-700"
                            >
                                Title
                            </label>
                            <input
                                id="title-edit"
                                type="text"
                                {...register('title')}
                                className="w-full rounded-md border border-slate-300 px-3 py-2"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="description-edit"
                                className="mb-1 block text-sm font-medium text-slate-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="description-edit"
                                {...register('description')}
                                className="w-full rounded-md border border-slate-300 px-3 py-2"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="priority-edit"
                                    className="mb-1 block text-sm font-medium text-slate-700"
                                >
                                    Priority
                                </label>
                                <select
                                    id="priority-edit"
                                    {...register('priority')}
                                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="status-edit"
                                    className="mb-1 block text-sm font-medium text-slate-700"
                                >
                                    Status
                                </label>
                                <select
                                    id="status-edit"
                                    {...register('status')}
                                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2"
                                >
                                    <option value="open">Open</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Dialog.Close asChild>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </Dialog.Close>
                            <Button type="submit" variant="primary">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
