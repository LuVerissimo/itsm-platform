import './App.css';
import { UserList } from './features/users/components/UserList';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <UserList />
            </header>
        </div>
    );
}

export default App;
