import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../../helper/axios";
import { Box, Button, TextField } from "@mui/material";
import './style.css'

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
  });
  
  useEffect(() => {
    // Fetch user data from the server based on the ID
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://yusroom.be.sman17gowa.com/api/admin/user/${id}`
        );
        const userData = response.data.data;
        setData(userData);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdateData = async () => {
    try {
      const response = await axios.patch(
        `https://yusroom.be.sman17gowa.com/api/admin/user/${id}`,
        data
      );
      console.log("Data berhasil diperbarui:", response.data);
      navigate("/users");
    } catch (error) {
      console.error("Terjadi kesalahan saat memperbarui data:", error);
    }
  };


  return (
    <Box sx={{mt:5}}>
      <Box className="box-titl" sx={{ marginBottom: '-20px' }} >
        <h2>Edit Data Pengguna</h2>
      </Box>
      <Box className="box-ad">
      <TextField
        label="Username"
        sx={{ mt: 2 }}
        name="username"
        value={data.username || ""}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Nama"
        name="name"
        sx={{ mt: 2 }}
        value={data.name || ""}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Email"
        sx={{ mt: 2 }}
        name="email"
        value={data.email || ""}
        onChange={handleInputChange}
        fullWidth
      />
      
      <Button variant="contained" onClick={handleUpdateData} sx={{ mt: 2 }}>
        Kirim
      </Button>
      </Box>
    </Box>
  );
};

export default EditUser;
