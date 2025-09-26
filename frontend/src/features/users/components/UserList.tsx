import { useUsers } from '../hooks/useUsers';

export const UserList = () => {
    const { users } = useUsers();

    return (
        <div>
            <h1>ITSM Platform Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};
