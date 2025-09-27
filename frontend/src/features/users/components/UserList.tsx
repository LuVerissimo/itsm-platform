import { useEffect } from 'react';
import { useUserStore } from '../../../stores/userStore';
import { UserForm } from './userForm';

export const UserList = () => {
    const { users, fetchUsers, addUser, deleteUser } = useUserStore();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(userId);
        }
    };

    return (
        <div className="p-4 md:p-8">
            {/* UserForm gets the addUser action from the store */}
            <UserForm onAddUser={addUser} />

            <h1 className="text-2xl font-bold text-slate-800 my-4">
                ITSM Platform Users
            </h1>
            <div className="space-y-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
                    >
                        <div>
                            <p className="font-bold text-slate-900">
                                {user.name}
                            </p>
                            <p className="text-sm text-slate-600">
                                {user.email}
                            </p>
                            <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-slate-700 bg-slate-200 rounded-full">
                                {user.role}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition">
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
