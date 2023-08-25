import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../../helper/axios";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
// import { Radio } from "@mui/icons-material";

const EditRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    name: "",
    description: "",
    is_active: "",
  });
  const [imageFile, setImageFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [value, setValue] = useState();

  useEffect(() => {
    // Fetch room data from the server based on the ID
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `https://yusroom.be.sman17gowa.com/api/admin/room/${id}`
        );
        const roomData = response.data.data;
        setData(roomData);
        console.log(roomData.is_active)
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data ruangan:", error);
      }
    };

    fetchRoomData();
  }, [id]);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  const handleChange = e => {
    setData( prev => ({
      ...prev,
      'is_active': e.target.value
    }))
  }

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setImageFile(image);

    if (image) {
      const reader = new FileReader();

      reader.onload = () => {
        setImageUrl(reader.result);
      };

      reader.readAsDataURL(image);
    } else {
      setImageUrl(''); // Clear imageUrl if no image is selected
    }
  };
  const handleUpdateData = async () => {
    try {
      // Create form data

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("is_active", data.is_active);
      if(imageFile != null ){
        formData.append("image", imageFile);
      }
    

      const response = await axios.post(
        `https://yusroom.be.sman17gowa.com/api/admin/room/${id}?_method=patch`,
        formData
      );
      console.log("Data berhasil diperbarui:", response.data);
      navigate("/rooms");
    } catch (error) {
      console.error("Terjadi kesalahan saat memperbarui data:", error);
    }
  };

  if (!data) {
    return <div>Loading...</div>; // Tambahkan tampilan loading jika data belum tersedia
  }

  return (
      <Box xs={8} sx={{ mt: 5, minHeight:300}} >
    <Box>
       <Box className="box-title" sx={{ marginBottom: '-20px' }} >
        <h2>Edit Ruangan Rapat</h2>
      </Box>
      <Box className="box-add" >
      <TextField
        label="Nama"
        name="name"
        sx={{ mt: 2 }}
        value={data.name || ""}
        onChange={handleInputChange}
        fullWidth
      />
      <Box  sx={{ mt: 2 }}>
        <label htmlFor="image" > Gambar</label> <br />
        <img src={data.image} width={100} /> 
      {imageUrl && <img width={100} sx={{margin:'5px'}} src={imageUrl} alt="Room"  />} <br/>
      <input type="file"   accept="image/*" onChange={handleImageChange} />
      
      </Box>
      <TextField
        label="Deskripsi"
        name="description"
        sx={{ mt: 2, }}
        value={data.description || ""}
        onChange={handleInputChange}
        fullWidth
      />
      {/* <TextField
        label="Status"
        name="is_active"
        sx={{ mt: 2 }}
        value={data.is_active || ""}
        onChange={handleInputChange}
        fullWidth
      /> */}

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
      <br/>
      <Button variant="contained"    sx={{ mt: 2 }} onClick={handleUpdateData}>
        Kirim
      </Button>
      </Box>
      </Box>
    </Box>
  );
};

export default EditRoom;
