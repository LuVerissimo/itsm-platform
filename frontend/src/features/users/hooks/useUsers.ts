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
            })
    }, []);

    const addUser = async (newUser: UserFormData) => {
        console.log(JSON.stringify({user: newUser}));
        try {
            const response = await fetch('http://localhost:4000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({user: newUser}),
            });

            if (!response.ok) {
                throw new Error('Failed to create a user');
            }

            const createdUserResponse = await response.json();
            setUsers(prevUsers => [...prevUsers, createdUserResponse.data]);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return { users, addUser };
};
