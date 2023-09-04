import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Button, Grid, TextField } from "@mui/material";
import { getIdTime, updateTime } from "../../services/time";

const EditTime = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await getIdTime(id);
      const timeData = response.data; // Adjust this based on your API response structure
      setStartTime(timeData.start_time);
      setEndTime(timeData.end_time);
    } catch (error) {
      console.error("Error fetching time data:", error);
    }
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleEditData = async () => {
    try {
      const response = await updateTime(id, {
        start_time: startTime,
        end_time: endTime,
      });

      console.log("Data berhasil diedit:", response.data);
      navigate("/time");
    } catch (error) {
      console.error("Error editing time data:", error);
    }
  };

  return (
    <Box sx={{mt:5}}>
      <h2 align="center">Edit Data Waktu</h2>
      <Box sx={{ m: 5, width: "100%"}}>
      <Grid container spacing={2}>
       
        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
        <TextField
          type="time"
          label="start time"
          value={startTime}
          onChange={handleStartTimeChange}
          inputProps={{ step: 300 }}
          sx={{mt:2,width:'25%' }}
        />
        </Grid>
        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
        <TextField
          type="time"
          label="end time"
          value={endTime}
          onChange={handleEndTimeChange}
          inputProps={{ step: 300 }}
          sx={{mt:2,width:'25%' }}
        />
        </Grid>
        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
        <Button
          variant="contained"
          sx={{mt:2,width:'25%' }}
          onClick={handleEditData}
          fullWidth
        >
          Edit
        </Button>
      </Grid>
      </Grid>

      </Box>
    </Box>
  );
};

export default EditTime;
