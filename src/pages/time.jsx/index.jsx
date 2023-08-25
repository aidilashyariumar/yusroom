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
import { deleteRoom, deleteTime, getAllTime } from '../../services/time';
import {useNavigate} from 'react-router';
import './style.css'



const TimePage = () => {
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getAllTime();
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const editData = (id) => {

    // setSelectedData(e.id)

    navigate(`/edit-time/${id}`)
  }

  const handleDelete = async (id) => {
    try {
      await deleteTime(id);
      console.log('Data deleted successfully');
      getData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };



  return (
    <Box >
     
    <Box sx={{ backgroundColor: '#1976D2', borderRadius: '10px', pt: 1, width:'100%', mt:4  }}>
      <Grid container spacing={2} sx={{ m: 1 }}>
        <Grid container justifyContent="space-between" alignItems='center'>
        <h2 style={{color:'white'}}>Time</h2>
        <Grid item className="add">
          <Button
            sx={{ borderColor: 'white', color: 'white'}}
            variant="outlined"
            onClick={() => {navigate("/add-time")}}
          >
            <AddIcon />
          </Button>
        </Grid>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ maxHeight: '350px' ,display: 'flex', justifyContent: 'center' }}>
        <Table aria-label="YUSROOM" stickyHeader width='80%' >
          <TableHead sx={{ backgroundColor: 'blue' }}>
            <TableRow >
              <TableCell align="center" >No</TableCell>
              <TableCell align="center">start time</TableCell>
              <TableCell align="center">end time</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item,index) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{item.start_time}</TableCell>
                <TableCell align="center" >{item.end_time}</TableCell>
                <TableCell align="center" sx={{display:'flex',justifyContent:'center'}} >
                <Box sx={{display:'flex',justifyContent:'space-between',width:'35%'}}>
                <Button
                  // startIcon={}
                  className="btn-edit"
                  onClick={() => editData(item.id)}
                  sx={{backgroundColor:'orange', color:'white',mt:1}}
                >
                  <EditIcon />
                </Button>
                <Button
                    variant="contained"
                    sx={{backgroundColor:'red',mt:1}}
                    // startIcon={}
                    className='del'
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon/>
                </Button>
                </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Box>
  );
};

export default TimePage;
