import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../../helper/axios";
import { Box, Button, TextField } from "@mui/material";

const EditTime = () => {
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
          `http://127.0.0.1:8000/api/admin/user/${id}`
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
      // Create form data
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("name", data.name);
      formData.append("email", data.email);
    
   
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/admin/user/${id}`,
        formData
      );
      console.log("Data berhasil diperbarui:", response.data);
      navigate("/users");
    } catch (error) {
      console.error("Terjadi kesalahan saat memperbarui data:", error);
    }
  };


  return (
    <Box>
      <h2>Edit Data Pengguna</h2>
      <TextField
        label="Username"
        name="username"
        value={data.username || ""}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Nama"
        name="name"
        value={data.name || ""}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        value={data.email || ""}
        onChange={handleInputChange}
        fullWidth
      />
      
      <Button variant="contained" onClick={handleUpdateData}>
        Perbarui
      </Button>
    </Box>
  );
};

export default EditTime;
