import { useState, useEffect } from 'react';
import { User, ApiResponse } from '../types';
import { UserFormData } from '../types/userSchema';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/users')
            .then((response) => response.json())
            .then((data: ApiResponse) => {
                setUsers(data.data);
            });
    }, []);

    const addUser = async (newUser: UserFormData) => {
        console.log(JSON.stringify({ user: newUser }));
        try {
            const response = await fetch('http://localhost:4000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: newUser }),
            });

            if (!response.ok) {
                throw new Error('Failed to create a user');
            }

            const createdUserResponse = await response.json();
            setUsers((prevUsers) => [...prevUsers, createdUserResponse.data]);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const updateUser = async (userId: string, updateInfo: UserFormData) => {
        try {
            const response = await fetch(
                `http://localhost:4000/api/users/${userId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: updateInfo }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            const updatedUser = (await response.json()).data;
            setUsers(
                users.map((user) =>
                    user.id === userId ? updatedUser.data : user
                )
            );
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            const response = await fetch(
                `http://localhost:4000/api/users/${userId}`,
                {
                    method: 'DELETE',
                }
            );
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            setUsers(users.filter((user) => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:, error);');
        }
    };

    return { users, addUser, updateUser, deleteUser };
};
