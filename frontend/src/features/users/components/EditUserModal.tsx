import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useUserStore } from '../../../stores/userStore';
import { userSchema, UserFormData } from '../types/userSchema';
import { Button } from '../../../components/Button';

export const EditUserModal: React.FC = () => {
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

    return (
        <Dialog.Root open={isModalOpen} onOpenChange={closeEditModal}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
                    <Dialog.Title className="text-xl font-semibold text-slate-800">
                        Edit User
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-slate-600">
                        Make changes to the user's profile here. Click save when
                        you're done.
                    </Dialog.Description>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-6 space-y-4"
                    >
                        <div className="flex flex-col">
                            <label
                                htmlFor="name"
                                className="mb-1 text-sm font-medium text-slate-700"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...register('name')}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="email"
                                className="mb-1 text-sm font-medium text-slate-700"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email')}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="role"
                                className="mb-1 text-sm font-medium text-slate-700"
                            >
                                Role
                            </label>
                            <input
                                id="role"
                                type="text"
                                {...register('role')}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                            />
                            {errors.role && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.role.message}
                                </p>
                            )}
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
