import { UserList } from './features/users/components/UserList';
import './App.css';
function App() {
    return (
        <div className="min-h-screen bg-slate-50">
            <main className="max-w-4xl mx-auto">
                <UserList />
            </main>
        </div>
    );
}

export default App;
