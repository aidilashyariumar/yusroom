import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Grid, TextField } from "@mui/material";
import { createTime } from "../../services/time";

const AddTime = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    start_time: "",
    end_time: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await createTime({
        start_time: data.start_time,
        end_time: data.end_time,
      });

      setIsLoading(false);
      
      navigate("/time"); // Redirect to time page after successful addition
      if (!response.data.success) {
        setError(response.data.message); // Set error message
        return;
      }

      setData({
        start_time: "",
        end_time: "",
      });

    } catch (error) {
      console.error("An error occurred while adding data:", error);
      setError("An error occurred while adding time."); // Set error message
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{mt:10 }} alignItems="center">
      <h2  align="center">Tambah Data Waktu</h2>
      <Box >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
              <TextField
                type="time"
                name="start_time"
                value={data.start_time}
                onChange={handleInputChange}
                inputProps={{ step: 300 }}
                sx={{mt:2,width:'25%' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
              <TextField
                type="time"
                name="end_time"
                value={data.end_time}
                onChange={handleInputChange}
                inputProps={{ step: 300 }}
                sx={{mt:2,width:'25%' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
              <Button
                type="submit"
                variant="contained"
                sx={{ m: 2, width: "25%" }}
                fullWidth
              >
                {isLoading ? "Menambahkan..." : "Tambah"}
              </Button>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <p style={{ color: "red" }}>{error}</p>
              </Grid>
            )}
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddTime;
