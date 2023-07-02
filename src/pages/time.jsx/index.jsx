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
import { deleteRoom, getAllTime } from '../../services/time';
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
      await deleteRoom(id);
      console.log('Data deleted successfully');
      getData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };



  return (
    <Box >
      <h1>Time</h1>
    <Box sx={{ backgroundColor: '#1976D2', borderRadius: '10px', pt: 1, width:'100%'  }}>
      <Grid container spacing={2} sx={{ m: 1 }}>
        <Grid xs={4}>
          {/* Search Component */}
        </Grid>
        <Grid container justifyContent="flex-end">
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
      <TableContainer component={Paper} sx={{ maxHeight: '300px' }}>
        <Table aria-label="YUSROOM" stickyHeader>
          <TableHead sx={{ backgroundColor: 'blue' }}>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>start time</TableCell>
              <TableCell>end time</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item,index) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.start_time}</TableCell>
                <TableCell>{item.end_time}</TableCell>
                <TableCell>
                <Button
                  icon={<EditIcon />}
                  className="btn-edit"
                  onClick={() => editData(item.id)}
                >
                  Edit
                </Button>

                    <Button
                    variant="contained"
                    sx={{backgroundColor:'red'}}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(item.id)}
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
    </Box>
  );
};

export default TimePage;