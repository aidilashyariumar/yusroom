


import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import { storeRoom } from '../../services/room';

const AddRoom = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);

  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file)); // Pastikan ini benar
    setData({ ...data, file });
  };
  
  const [data, setData] = useState({
    name: '',
    image: null,
    description: '',
    is_active: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingButton(true);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.file);
    formData.append('description', data.description);
    formData.append('is_active', data.is_active);

    try {
      const response = await storeRoom(formData);
      setLoadingButton(false);

      if (!response.success) {
      navigate('/rooms');
        return;
      }


      setData({
        name: '',
        image: null,
        description: '',
        is_active: '',
      });
    } catch (error) {
      console.error('Terjadi kesalahan saat menambahkan data:', error);
      setLoadingButton(false);
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


        <Button sx={{ my: 2 }} variant="contained" disabled={loadingButton} onClick={handleSubmit}>
          {loadingButton ? 'Loading...' : 'Kirim'}
        </Button>
      </Box>
    </Box>
  );
};

export default AddRoom;
