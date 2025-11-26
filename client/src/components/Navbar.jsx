import { Link, useLocation } from 'wouter';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';

export function Navbar() {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]); // Re-check on route change

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout');
      localStorage.removeItem('user');
      setUser(null);
      setLocation('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
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
