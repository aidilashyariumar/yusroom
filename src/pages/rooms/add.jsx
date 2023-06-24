import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';
// import {useHistory} from 'react-router-dom'


const AddRoom = () => {

  // const history = useHistory();
  const navigate = useNavigate()
    
  const [data, setData] = useState({
    name: '',
    description: '',
    is_active: '',
    field4: '',
    field5: '',
    file: null
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setData({ ...data, file: e.target.files[0] });
  };

  const handleSaveData = async () => {
    try {
      // Membuat FormData untuk mengirim data dan file
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('file', data.file);
      formData.append('description', data.description);
      formData.append('is_active', data.is_active);

      // Lakukan permintaan POST ke server dengan menggunakan Axios
      const response = await axios.post('http://127.0.0.1:8000/api/admin/room', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Data berhasil ditambahkan:', response.data);

      // Reset input
    //   setData({
    //     name: '',
    //     file: null,
    //     description: '',
    //     is_active: '',
    //   });

      navigate('/rooms');
    } catch (error) {
      console.error('Terjadi kesalahan saat menambahkan data:', error);
    }
  };

  return (
    <div>
      <TextField label="Name" name="name" value={data.name} onChange={handleInputChange} fullWidth />
      <Box sx={{ mt: 2 }}>
        <label htmlFor="image">Image</label>
        <input name='image' type="file" onChange={handleFileChange} />
      </Box>
      <TextField label="Description" name="description" value={data.description} onChange={handleInputChange} fullWidth />
      <TextField label="Description" name="is_active" value={data.is_active} onChange={handleInputChange} fullWidth />
     
      <Button variant="contained" onClick={handleSaveData}>
        Tambah Data
      </Button>
    </div>
  );
};

export default AddRoom;
