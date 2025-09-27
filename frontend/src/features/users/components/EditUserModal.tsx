import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
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

    const onSubmit: SubmitHandler<UserFormData> = (data) => {
        if (editingUser) {
            updateUser(editingUser.id, data);
            closeEditModal();
        }
    };

     return (
    <Dialog open={isModalOpen} onClose={closeEditModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded bg-white p-6 shadow-xl">
          <DialogTitle className="text-xl font-semibold mb-4">Edit User</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Save Changes</button>
            <button type="button" onClick={closeEditModal} className="mt-4 ml-2 px-4 py-2 bg-gray-200 rounded">Cancel</button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
