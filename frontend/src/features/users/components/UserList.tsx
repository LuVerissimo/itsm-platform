import { useUsers } from '../hooks/useUsers';
import { UserForm } from './userForm';

export const UserList = () => {
    const { users, addUser } = useUsers();

    return (
        <div>
            <UserForm onAddUser={addUser} />
            <hr />

            <h1>ITSM Platform Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - ({user.email}) - Role: {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};
