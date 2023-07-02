import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "../../helper/axios";
import { Box, Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from "@mui/x-date-pickers";

const AddTime = () => {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const handleAddData = async () => {
    try {
      // Convert start_time and end_time to desired format before sending to the server
      const formattedStartTime = startTime.toISOString();
      const formattedEndTime = endTime.toISOString();

      // Create form data
      const formData = new FormData();
      formData.append("start_time", formattedStartTime);
      formData.append("end_time", formattedEndTime);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/time",
        formData
      );
      console.log("Data berhasil ditambahkan:", response.data);
      navigate("/time");
    } catch (error) {
      console.error("Terjadi kesalahan saat menambahkan data:", error);
    }
  };

  return (
    <Box>
      <h2>Tambah Data Waktu</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
     
        <TimePicker
          label="Start Time"
          value={startTime}
          onChange={handleStartTimeChange}
          format="HH:mm:ss"
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="End Time"
          value={endTime}
          onChange={handleEndTimeChange}
          format="HH:mm:ss"
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button variant="contained" onClick={handleAddData}>
        Tambah
      </Button>
    </Box>
  );
};

export default AddTime;
