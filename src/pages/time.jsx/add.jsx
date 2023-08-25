import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { createTime } from "../../services/time";

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
      console.log(`${startTime.hour()} : ${startTime.minute()}`);
      const formattedStartTime = `${startTime.hour()}:${startTime.minute()}`;
      const formattedEndTime = `${endTime.hour()}:${endTime.minute()}`;
      // Create form data
      const formData = new FormData();
      formData.append("start_time", formattedStartTime);
      formData.append("end_time", formattedEndTime);

      console.log(formattedStartTime);

      const response = await createTime(formData);
      console.log("Data berhasil ditambahkan:", response.data);
      navigate("/time");

      setEndTime({
        end_time: "",
      });
      setStartTime({
        start_time: "",
      });
    } catch (error) {
      console.error("Terjadi kesalahan saat menambahkan data:", error);
    }
  };

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h2>Tambah Data Waktu</h2>
        <Box sx={{ m: 5 }}>
          <TimePicker
            fullWidth
            label="Start Time"
            value={startTime}
            onChange={handleStartTimeChange}
            format="HH:mm"
            renderInput={(params) => <TextField {...params} />}
            sx={{ display: "block", m: 2, width: "60%" }}
          />
          <TimePicker
            label="End Time"
            value={endTime}
            onChange={handleEndTimeChange}
            format="HH:mm"
            renderInput={(params) => <TextField {...params} />}
            sx={{ display: "block", m: 2, width: "60%" }}
            fullWidth
          />
          <Button
            variant="contained"
            sx={{ m: 2, width: "60%" }}
            onClick={handleAddData}
            fullWidth
          >
            Tambah
          </Button>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default AddTime;
