import { UserList } from './features/users/components/UserList';
import { useState } from 'react';
import { TicketList } from './features/tickets/components/TicketList';
import { Button } from './components/Button';
import { useUserStore } from './stores/userStore';
import { ArticleList } from './features/articles/components/ArticleList';

export function MainApp() {
    const [currentView, setCurrentView] = useState('tickets');
    const { logout, currentUser } = useUserStore();

    const navLinkClasses =
        'px-4 py-2 rounded-md text-sm font-medium transition';
    const activeLinkClasses = 'bg-white text-blue-700 shadow';
    const inactiveLinkClasses = 'text-slate-600 hover:bg-white/50';

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-slate-100 p-4 border-b border-slate-200">
                <nav className="max-w-4xl mx-auto flex gap-2 p-1 bg-slate-200 rounded-lg w-min">
                    <button
                        onClick={() => setCurrentView('tickets')}
                        className={`${navLinkClasses} ${
                            currentView === 'tickets'
                                ? activeLinkClasses
                                : inactiveLinkClasses
                        }`}
                    >
                        Tickets
                    </button>

                    {currentUser?.role === 'admin' && (
                        <button
                            onClick={() => setCurrentView('users')}
                            className={`${navLinkClasses} ${
                                currentView === 'users'
                                    ? activeLinkClasses
                                    : inactiveLinkClasses
                            }`}
                        >
                            Users
                        </button>
                    )}

                    <button
                        onClick={() => setCurrentView('articles')}
                        className={`${navLinkClasses} ${
                            currentView === 'articles'
                                ? activeLinkClasses
                                : inactiveLinkClasses
                        }`}
                    >
                        Articles
                    </button>
                </nav>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-700">
                        Welcome, {currentUser?.name}
                    </span>
                    <Button onClick={logout} variant="secondary">
                        Logout
                    </Button>
                </div>
            </header>
            <main className="relative z-0 max-w-4xl mx-auto">
                {currentView === 'tickets' && <TicketList />}
                {currentView === 'users' && currentUser?.role === 'admin' && (
                    <UserList />
                )}
                {currentView === 'articles' && <ArticleList />}
            </main>
        </div>
    );
}

export default MainApp;
