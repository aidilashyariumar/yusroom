import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Table,
  Paper,
  Button,
  Grid,
  Box,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { deleteRoom, getAllRoom } from '../../services/room';
import {useNavigate} from 'react-router';
import './style.css'
import { getAllBooking, updateBooking } from '../../services/approve';
import axios from '../../helper/axios';



const RoomPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  
  const [data, setData] = useState([]);
  

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getAllBooking();
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = async (newValue, id) => {
    try {
      const response = await updateBooking(id, { is_approved: newValue });
  
      // Jika respons dari API adalah "success" atau sesuai dengan kebutuhan Anda
      if (response.data === "success") {
        // Perbarui status booking yang sesuai dalam data
        const updatedData = data.map(item =>
          item.id === id ? { ...item, is_approved: newValue } : item
        );
        setData(updatedData);
      }
      getData();
      // setData(false)
    } catch (error) {
      console.error("Terjadi kesalahan saat memanggil API:", error);
    }
  };
  


  return (
    <>
    <Box className="kotak" sx={{ backgroundColor: '#1976D2', borderRadius: '10px', pt: 1, width:'100%', mt:4 }}>
      <Grid container spacing={2} sx={{ m: 1 }}>
      <Grid container justifyContent="space-between" alignItems='center'>
        <h2 style={{color:'white'}}>Booking</h2>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ maxHeight: '350px' }}>
        <Table aria-label="YUSROOM" stickyHeader>
          <TableHead sx={{ backgroundColor: 'blue' }}>
            <TableRow>
              <TableCell >No</TableCell>
              <TableCell >Name</TableCell>
              <TableCell align='center' >Room Name</TableCell>
              <TableCell >Image</TableCell>
              <TableCell >Date</TableCell>
              <TableCell >start Time</TableCell>
              <TableCell >End Time</TableCell>
              <TableCell >Ket</TableCell>
              <TableCell >Description</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item,index) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell >{index + 1}</TableCell>
                <TableCell >{item.user_name}</TableCell>
                <TableCell >{item.room_name}</TableCell>
                <TableCell align="center">
                  <img src={`${item.room_image}`} width={30} alt="Room" />
                </TableCell>
                <TableCell >{item.booking_date}</TableCell>
                <TableCell >{item.start_time}</TableCell>
                <TableCell >{item.end_time}</TableCell>
                <TableCell >{item.is_approved == 1 ? 
                 <Box sx={{ backgroundColor: 'orange', color: 'white', width: '97px', height: '25px', padding: 0.5, borderRadius: '5px' }} align="center">Diterima</Box>
                : 
                  <Box sx={{ backgroundColor: 'red', color: 'white', width: '97px', height: '35px', padding: 0.5, borderRadius: '5px' }} align="center">Belum Diterima</Box>
                }</TableCell>
                <TableCell >{item.description}</TableCell>
                <TableCell align="center">
                <Box sx={{display:'flex',justifyContent:'space-evenly',width:'100%'}}>
                <IconButton
                  // startIcon={<EditI />}
                  className="btn-edit"
                  sx={{backgroundColor:'orange', color:'white',marginRight:2}}
                  onClick={() => handleToggle(1,item.id)}
                >
                  <CheckCircleOutlineRoundedIcon/>
                </IconButton>
                <IconButton
                  // startIcon={<EditI />}
                  className="btn-edit"
                  sx={{backgroundColor:'red', color:'white'}}
                  onClick={() => handleToggle(0,item.id)}
                >
                    <HighlightOffRoundedIcon/>
                </IconButton>
              </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </>
  );
};

export default RoomPage;
