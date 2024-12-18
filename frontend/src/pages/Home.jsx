import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold my-4">Welcome to the MERN Chat App</h1>
      <p className="mb-6">Login or Register to start chatting!</p>
      <Link to="/login" className="btn btn-primary mx-2">Login</Link>
      <Link to="/register" className="btn btn-secondary mx-2">Register</Link>
    </div>
  );
};

export default Home;
