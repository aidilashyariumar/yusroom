import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { storeUser } from '../../services/user';

const AddUser = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [data, setData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setIsLoading(true);
    setError(''); // Clear previous errors

    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);

    try {
      const response = await storeUser(formData);

      setIsLoading(false);

      if (!response.data.success) {
        setError(response.responseMessage); 
        setIsLoading(true);
        navigate('/users');
        // Set error message
        return;
      }


      setData({
        username: '',
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('An error occurred while adding data:', error);
      setError('An error occurred while adding user.'); // Set error message
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box className="box-title" sx={{ backgroundColor: 'blue', marginBottom: '-20px' }} width="90%">
        <h2>Tambah Data</h2>
      </Box>
      <Box className="box-add">
        <form onSubmit={handleSubmit}>
          <TextField sx={{ mt: 2 }} label="Username" name="username" value={data.username} onChange={handleInputChange} fullWidth />
          <TextField sx={{ mt: 2 }} label="Name" name="name" value={data.name} onChange={handleInputChange} fullWidth />
          <TextField sx={{ mt: 2 }} label="Email" name="email" value={data.email} onChange={handleInputChange} fullWidth />
          <TextField sx={{ mt: 2 }} label="Password" name="password" value={data.password} onChange={handleInputChange} fullWidth />

          <Button sx={{ my: 2 }} type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Kirim'}
          </Button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Box>
    </Box>
  );
};

export default AddUser;
