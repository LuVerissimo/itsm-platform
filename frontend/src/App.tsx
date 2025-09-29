import { useUserStore } from './stores/userStore';
import { LoginForm } from './features/auth/components/LoginForm';
import MainApp from './MainApp';
import './App.css';
import { useAuth } from './hooks/useAuth';

function App() {
    useAuth();
    const { currentUser, loading } = useUserStore();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!currentUser) {
        return <LoginForm />;
    }

    return <MainApp />;
}

export default App;
