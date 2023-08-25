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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { deleteRoom, getAllRoom } from '../../services/room';
import {useNavigate} from 'react-router';
import './style.css'



const RoomPage = () => {
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getAllRoom();
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editData = (id) => {

    // setSelectedData(e.id)

    navigate(`/edit-room/${id}`)
  }

  const handleDelete = async (id) => {
    try {
      await deleteRoom(id);
      console.log('Data deleted successfully');
      getData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };



  return (
    <>
    <div></div>
      <h1>Room</h1>
    <Box className="kotak" sx={{ backgroundColor: '#1976D2', borderRadius: '10px', pt: 1, width:'100%' }}>
      <Grid container spacing={2} sx={{ m: 1 }}>
        <Grid xs={4}>
          {/* Search Component */}
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item className='add'>
          <Button
            sx={{ borderColor: 'white', color: 'white'  }}
            variant="outlined"
            
            onClick={() => {navigate("/add-room")}}
          >
            <AddIcon />
          </Button>
          </Grid>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ maxHeight: '300px' }}>
        <Table aria-label="YUSROOM" stickyHeader>
          <TableHead sx={{ backgroundColor: 'blue' }}>
            <TableRow>
              <TableCell >No</TableCell>
              <TableCell >Name</TableCell>
              <TableCell align='center' >image</TableCell>
              <TableCell >Description</TableCell>
              <TableCell >Status</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item,index) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell >{index + 1}</TableCell>
                <TableCell >{item.name}</TableCell>
                <TableCell align="center">
                  <img src={`${item.image}`} width={30} alt="Room" />
                </TableCell>
                <TableCell >{item.description}</TableCell>
                <TableCell align="center">
                  {item.is_active === 1 ? (
                    <Box sx={{ backgroundColor: 'pink', color: 'red', width: '60px', height: '30px', padding: 0.5, borderRadius: '5px' }} align="center">tersedia</Box>
                  ) : (
                    <Box sx={{ backgroundColor: 'silver', color: 'white', width: '97px', height: '30px', padding: 0.5, borderRadius: '5px' }} align="center">tidak Tersedia</Box>
                  )}
                </TableCell>
                <TableCell align="center">
                <Button
                  startIcon={<EditIcon />}
                  className="btn-edit"
                  sx={{backgroundColor:'orange', color:'white',marginRight:2}}
                  onClick={() => editData(item.id)}
                >
                  Edit
                </Button>

                    <Button
                    variant="contained"
                    sx={{backgroundColor:'red'}}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(item.id)}
                    className='del'
                  >
                    Delete
                  </Button>
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
