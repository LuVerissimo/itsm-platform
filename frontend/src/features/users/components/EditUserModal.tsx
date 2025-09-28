import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogBackdrop, DialogTitle } from '@headlessui/react';
import { useUserStore } from '../../../stores/userStore';
import { userSchema, UserFormData } from '../types/userSchema';
import { Button } from '../../../components/Button';

export const EditUserModal = () => {
    const { isModalOpen, editingUser, closeEditModal, updateUser } =
        useUserStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
    });

    useEffect(() => {
        if (editingUser) {
            reset(editingUser);
        } else {
            reset({ name: '', email: '', role: '' });
        }
    }, [editingUser, reset]);

    const onSubmit: SubmitHandler<UserFormData> = (data) => {
        if (editingUser) {
            updateUser(editingUser.id, data);
        }
        closeEditModal();
    };

    return (
        <Dialog
            open={isModalOpen}
            onClose={closeEditModal}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
        >
            <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-40" />

            <div className="relative w-full max-w-lg mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
                <DialogTitle className="text-2xl font-bold text-slate-900">
                    Edit User
                </DialogTitle>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-6 space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register('name')}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email')}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Role
                        </label>
                        <input
                            type="text"
                            placeholder="Role"
                            {...register('role')}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.role && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.role.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={closeEditModal}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};
