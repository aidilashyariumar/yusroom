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
  Skeleton,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { deleteRoom, getAllUsers } from '../../services/user';
import {useNavigate} from 'react-router';
import './style.css'


const UsersPage = () => {
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState()
  const [open, setOpen] = React.useState(false);
  

  useEffect(() => {
    setLoading(true)
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getAllUsers();
      setData(response.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const editData = (id) => {

    // setSelectedData(e.id)

    navigate(`/edit-user/${id}`)
  }

  const handleDelete = async (id) => {
    try {
      await deleteRoom(id);
      console.log('Data deleted successfully');
      setOpen(false)
      getData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  return (
    <Box>
  
    <Box sx={{ backgroundColor: '#1976D2', borderRadius: '10px' , width:'100%',mt:4}}>
      <Grid container spacing={2} sx={{ m: 1 }}>
        <Grid container justifyContent="space-between" alignItems='center'>
          <h2 style={{color:'white'}}>Users</h2>
        <Grid item className="add">
          <Button
            sx={{ borderColor: 'white', color: 'white', }}
            variant="outlined"
            onClick={() => {navigate("/add-user")}}
          >
            <AddIcon />
          </Button>
        </Grid>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ maxHeight: '350px' }}>
        <Table aria-label="YUSROOM" stickyHeader>
          <TableHead sx={{ backgroundColor: 'blue' }}>
            <TableRow>
              <TableCell align='center'>No</TableCell>
              <TableCell align='center'>Username</TableCell>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {loading ? (
            <>
            <TableCell key="loading">
              <Skeleton animation="wave"  />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave"  />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave"  />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave"  />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave"  />
            </TableCell>
            </>
      ) : (
            data.map((item,index) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='center'>{index + 1}</TableCell>
                <TableCell align='center'>{item.username}</TableCell>
                <TableCell align='center'>{item.name}</TableCell>
                <TableCell align='center'>{item.email}</TableCell>
                
                <TableCell sx={{display:'flex',justifyContent:'center'}}>
                <Box sx={{display:'flex',justifyContent:'space-evenly',width:'50%'}}>
                <IconButton
                  className="btn-edit"
                  onClick={() => editData(item.id)}
                  sx={{backgroundColor:'orange', color:'white',mt:1}}
                >
                  <EditIcon/>
                </IconButton>
                <IconButton color="inherit" onClick={handleOpen}  sx={{backgroundColor:'red', color:'white',mt:1}}>
              <DeleteIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} 
            BackdropProps={{
                sx: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Ubah warna latar belakang di sini
                },
              }}>
              <DialogTitle>Hapus</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Apakah Anda yakin ingin menghapus data?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Batal
                </Button>
                <Button
                  // startIcon={}
                  onClick={() => handleDelete(item.id)}
                >
                  hapus
                </Button>
              </DialogActions>
            </Dialog>
                </Box>
                    
                </TableCell>
              </TableRow>
            ))
          )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
     
    </Box>
  );
};

export default UsersPage;
