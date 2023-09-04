import React from 'react';
import axios from 'axios';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      // Lakukan panggilan ke server untuk proses logout
      await axios.post('/logout'); // Ganti dengan URL yang sesuai

      // Panggil fungsi onLogout yang diberikan melalui props
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
