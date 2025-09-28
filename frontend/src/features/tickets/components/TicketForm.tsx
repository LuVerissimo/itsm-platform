import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TicketFormData, ticketSchema } from '../types/ticketSchema';
import { Button } from '../../../components/Button';

interface TicketFormProps {
    onAddTicket: (ticket: TicketFormData) => void;
}

export const TicketForm = ({ onAddTicket }: TicketFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TicketFormData>({
        resolver: zodResolver(ticketSchema),
        defaultValues: {
            priority: 'low',
            status: 'open',
        },
    });
    const onSubmit: SubmitHandler<TicketFormData> = (data) => {
        onAddTicket(data);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 mb-6 bg-white rounded-lg shadow-md space-y-4"
        >
            <h3 className="text-xl font-semibold text-slate-800">
                Create New Ticket
            </h3>

            <div>
                <label
                    htmlFor="title"
                    className="block mb-1 text-sm font-medium text-slate-700"
                >
                    Title
                </label>
                <input
                    id="title"
                    {...register('title')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                />
                {errors.title && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="block mb-1 text-sm font-medium text-slate-700"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    {...register('description')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                />
                {errors.description && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="priority"
                        className="block mb-1 text-sm font-medium text-slate-700"
                    >
                        Priority
                    </label>
                    <select
                        id="priority"
                        {...register('priority')}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="status"
                        className="block mb-1 text-sm font-medium text-slate-700"
                    >
                        Status
                    </label>
                    <select
                        id="status"
                        {...register('status')}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white"
                    >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary">
                    Create Ticket
                </Button>
            </div>
        </form>
    );
};
