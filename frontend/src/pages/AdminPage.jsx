import { useAuth } from '../hooks/useAuth.js';
import { useStylesheet } from '../hooks/useStylesheet.js';
import LoginView from '../components/admin/LoginView.jsx';
import Dashboard from '../components/admin/Dashboard.jsx';

export default function AdminPage() {
  useStylesheet('/styles/admin.css');
  const { isAdmin } = useAuth();

  return (
    <main className="admin-shell">
      {isAdmin ? <Dashboard /> : <LoginView />}
    </main>
  );
}
