import { Link, useLocation } from 'wouter';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';

export function Navbar() {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [location]); // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setLocation('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">User App</Link>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link href="/login" className="hover:text-gray-300">Login</Link>
              <Link href="/register" className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
