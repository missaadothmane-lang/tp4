import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../features/auth/authSlice';
import { setAuthToken } from '../api/axios';
import { Menu, LogOut } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    setAuthToken(null);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button 
          className="btn-icon" 
          onClick={onToggleSidebar}
          title={isSidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <Menu size={20} />
        </button>
      </div>
      
      <div className="header-right">
        {user && (
          <div className="user-profile">
            <span className="user-name">{user.name}</span>
            <div className="avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button className="btn-icon error" onClick={handleLogout} title="Se déconnecter">
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
