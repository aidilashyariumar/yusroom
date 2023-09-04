


import React, { useState } from 'react';
import { Button, TextField, Box, FormControlLabel, Radio, RadioGroup, FormLabel, FormControl, Grid, Input, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router';
import { storeRoom } from '../../services/room';
import './style.css'

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
  const handleChange = e => {
    setData( prev => ({
      ...prev,
      'is_active': e.target.value
    }))
  }

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
    <Box sx={{mt:5}}>
      <Box className="box-titl" sx={{ marginBottom: '-20px' }} >
        <h2>Tambah Data</h2>
      </Box>
      <Box className="box-ad">
      <TextField sx={{ mt: 2 }} label="Name" name="name" value={data.name} onChange={handleInputChange} fullWidth />
        <Box sx={{ mt: 2 }}>
      <div>
          
      <InputLabel htmlFor="upload-button">
        Upload Gambar
      </InputLabel>
      <Input
        id="upload-button"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileUploadChange}
      />
      <label htmlFor="upload-button">
        <Button
          variant="contained"
          component="span"
        >
          Pilih Gambar
        </Button>
      </label>
      {selectedImage && <p>File terpilih: {selectedImage.name}</p>}
      {selectedImage && (
              <div>
                <img width={100} src={selectedImage} alt="Preview" />
              </div>
            )}
  
          </div>
        </Box>
        <TextField sx={{ mt: 2, mb:2 }} label="Description" name="description" value={data.description} onChange={handleInputChange} fullWidth />
        <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={data.is_active}
          onChange={handleChange}
        >
          <Box sx={{display:"flex"}}>
          <FormControlLabel value="1" control={<Radio />}  label="tersedia" />
          <FormControlLabel value="0" control={<Radio />}  label="Tidak Tersedia" />
          </Box>
        </RadioGroup>
      </FormControl>
      <Grid>
        <Button sx={{ my: 2 }} variant="contained" disabled={loadingButton} onClick={handleSubmit}>
          {loadingButton ? 'Loading...' : 'Kirim'}
        </Button>
      </Grid>
      </Box>
    </Box>
  );
};

export default AddRoom;
