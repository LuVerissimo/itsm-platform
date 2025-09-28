import { useUserStore } from './stores/userStore';
import { LoginForm } from './features/auth/components/LoginForm';
import MainApp from './MainApp';
import './App.css';

function App() {
    const { currentUser } = useUserStore();

    if (!currentUser) {
        return <LoginForm />;
    }

    return <MainApp />;
}

export default App;
