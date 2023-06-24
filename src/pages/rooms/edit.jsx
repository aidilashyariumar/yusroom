import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const EditRoom = ({ initialData, onSave }) => {
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={data.name}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="Email"
        value={data.email}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default EditRoom;
