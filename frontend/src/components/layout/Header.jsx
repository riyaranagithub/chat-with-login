import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(sessionStorage.getItem('userData')) || null;

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-xl font-bold hover:text-gray-400 transition">
          MERN Chat
        </Link>
        <div className="flex items-center">
          {userData ? (
            <>
              <span className="mx-2">Hello, <strong>{userData.username}</strong></span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="mx-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="mx-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
