import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormData } from '../types/userSchema';

interface UserFormProps {
    onAddUser: (user: UserFormData) => void;
}

export const UserForm = ({ onAddUser }: UserFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
    });

    const onSubmit: SubmitHandler<UserFormData> = (data) => {
        onAddUser(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Create New User</h3>
            <input type="text" placeholder="Name" {...register('name')} />
            {errors.name && (
                <p style={{ color: 'red' }}> {errors.name.message}</p>
            )}
            <input type="email" placeholder="Email" {...register('email')} />
            {errors.email && (
                <p style={{ color: 'red' }}> {errors.email.message}</p>
            )}
            <input type="text" placeholder="Role" {...register('role')} />
            {errors.role && (
                <p style={{ color: 'red' }}> {errors.role.message}</p>
            )}
            <button type="submit">Add User</button>
        </form>
    );
};
