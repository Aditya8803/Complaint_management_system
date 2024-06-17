import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Complaint Register Application</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Create Account</Link>
    </div>
  );
};

export default Home;
