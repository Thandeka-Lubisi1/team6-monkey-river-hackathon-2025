import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Bell } from 'lucide-react';

interface NavbarProps {
  title?: string;
  notificationCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  title = "Dashboard", 
  notificationCount = 3 
}) => {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      navigate('/', { replace: true });
      console.log("log out success");
    } catch (e) {
      console.log("error logging out", e);
    }
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-gray-800">{title}</Link>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-gray-50 border-b">
                  <p className="text-sm font-medium text-gray-800">Hurricane warning for Caribbean</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
                <div className="p-3 hover:bg-gray-50 border-b">
                  <p className="text-sm font-medium text-gray-800">Flight delay notification</p>
                  <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                </div>
                <div className="p-3 hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-800">Profile updated successfully</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>
              <div className="p-3 border-t">
                <Link 
                  to="/alerts" 
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setShowNotifications(false)}
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Navbar;