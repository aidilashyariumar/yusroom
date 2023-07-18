import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddRoom = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setData({ ...data, file });
  };

  const [data, setData] = useState({
    name: '',
    file: null,
    description: '',
    is_active: '',
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSaveData = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('image', data.file);
      formData.append('description', data.description);
      formData.append('is_active', data.is_active);

      const response = await axios.post(
        'http://127.0.0.1:8000/api/admin/room',
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
        name: '',
        file: null,
        description: '',
        is_active: '',
      });

      navigate('/rooms');
    } catch (error) {
      console.error('Terjadi kesalahan saat menambahkan data:', error);
    }
  };

  return (
    <Box>
      <Box className="box-title" sx={{ marginBottom: '-20px' }} >
        <h2>Tambah Data</h2>
      </Box>
      <Box className="box-add">
        <TextField sx={{ mt: 2 }} label="Name" name="name" value={data.name} onChange={handleInputChange} fullWidth />
        <Box sx={{ mt: 2 }}>
          <div>
            <label htmlFor="image">Image</label>
            <input name="image" type="file" onChange={handleFileUploadChange} />
            {selectedImage && (
              <div>
                <img width={100} src={selectedImage} alt="Preview" />
              </div>
            )}
          </div>
        </Box>
        <TextField sx={{ mt: 2 }} label="Description" name="description" value={data.description} onChange={handleInputChange} fullWidth />
        <TextField sx={{ mt: 2 }} label="Status" name="is_active" value={data.is_active} onChange={handleInputChange} fullWidth />

        <Button sx={{ my: 2 }} variant="contained" disabled={isLoading} onClick={handleSaveData}>
          {isLoading ? 'Loading...' : 'Kirim'}
        </Button>
      </Box>
    </Box>
  );
};

export default AddRoom;
