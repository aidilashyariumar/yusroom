import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddUser = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  

  const [data, setData] = useState({
    username: '',
    name: '',
    email: '',
    is_admin: '',
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSaveData = async () => {
    try {
    //   setIsLoading(true);

      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);

      const response = await axios.post(
        'http://127.0.0.1:8000/api/admin/user',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Data berhasil ditambahkan:', response.data);

      setIsLoading(false);

      setData({
        username: '',
        name: '',
        email: '',
        password: '',
      });

      navigate('/users');
    } catch (error) {
      console.error('Terjadi kesalahan saat menambahkan data:', error);
    }
  };

  return (
    <Box>
      <Box className="box-title" sx={{ backgroundColor: 'blue', marginBottom: '-20px' }} width="90%">
        <h2>Tambah Data</h2>
      </Box>
      <Box className="box-add">
        <TextField sx={{ mt: 2 }} label="Username" name="username" value={data.username} onChange={handleInputChange} fullWidth />
        <TextField sx={{ mt: 2 }} label="Name" name="name" value={data.name} onChange={handleInputChange} fullWidth />
        <TextField sx={{ mt: 2 }} label="Email" name="email" value={data.email} onChange={handleInputChange} fullWidth />
        <TextField sx={{ mt: 2 }} label="Status" name="password" value={data.password} onChange={handleInputChange} fullWidth />

        <Button sx={{ my: 2 }} variant="contained" disabled={isLoading} onClick={handleSaveData}>
          {isLoading ? 'Loading...' : 'Kirim'}
        </Button>
      </Box>
    </Box>
  );
};

export default AddUser;
