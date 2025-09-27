import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import { useUserStore } from '../../../stores/userStore';
import { userSchema, UserFormData } from '../types/userSchema';

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
        }
    }, [editingUser, reset]);

    const onSubmit: SubmitHandler<UserFormData> = (data) => {
        if (editingUser) {
            updateUser(editingUser.id, data);
            closeEditModal();
        }
    };

    if (!editingUser) {
        return null;
    }

    return (
        <Dialog
            open={isModalOpen}
            onClose={closeEditModal}
            className="relative z-50"
        >
            <DialogBackdrop
                className="fixed inset-0 bg-black/30"
                aria-hidden="true"
            />

            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                    <DialogTitle className="text-xl font-semibold text-slate-800">
                        Edit User
                    </DialogTitle>

                    {/* <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-4 space-y-4"
                    >
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                {...register('name')}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register('email')}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Role"
                                {...register('role')}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.role && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.role.message}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                type="button"
                                onClick={closeEditModal}
                                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form> */}
                </DialogPanel>
            </div>
        </Dialog>
    );
};
