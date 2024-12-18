import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">MERN Chat</Link>
        <div>
          {userInfo ? (
            <>
              <span className="mx-2">Hello, {userInfo.username}</span>
              <button onClick={handleLogout} className="mx-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mx-2">Login</Link>
              <Link to="/register" className="mx-2">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
