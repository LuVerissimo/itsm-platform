import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormData } from '../types/userSchema';
import { Button } from '../../../components/Button';

interface UserFormProps {
  onAddUser: (user: UserFormData) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onAddUser }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    onAddUser(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 mb-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-slate-800">Create New User</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="name-create" className="sr-only">Name</label>
          <input
            id="name-create"
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full px-3 py-2 border border-slate-300 rounded-md"
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email-create" className="sr-only">Email</label>
          <input
            id="email-create"
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full px-3 py-2 border border-slate-300 rounded-md"
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="role-create" className="sr-only">Role</label>
          <input
            id="role-create"
            type="text"
            placeholder="Role"
            {...register("role")}
            className="w-full px-3 py-2 border border-slate-300 rounded-md"
          />
          {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>}
        </div>
      </div>

      <div className="flex justify-end mt-4">
          <Button type="submit" variant="primary">Add User</Button>
      </div>
    </form>
  );
};