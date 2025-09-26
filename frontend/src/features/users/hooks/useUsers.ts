import { useState, useEffect } from 'react';
import { User, ApiResponse } from '../types';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/users')
            .then((response) => response.json())
            .then((data: ApiResponse) => {
                setUsers(data.data);
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    return { users };
};
