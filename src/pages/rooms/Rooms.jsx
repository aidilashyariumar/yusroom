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
  TextField,
  Box,
  Modal,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { deleteRoom, getAllRoom } from '../../services/room';
import { styled } from '@mui/material/styles';
import {useNavigate } from 'react-router';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditDataPage = () => {
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedData, setSelectedData] = useState('')
  const [modalMode, setModalMode] = useState('');
  const [inputData, setInputData] = useState('');

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

  const editData = (e) => {

    setSelectedData(e.id)

    navigate("/edit-room",{state:e})
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

  const handleOpenModal = (mode, initialData = '') => {
    setIsModalOpen(true);
    setModalMode(mode);
    setModalTitle(mode === 'edit' ? 'Edit Data' : 'Tambah Data');
    setInputData(initialData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveData = () => {
    console.log('Data yang akan disimpan:', inputData);
    // Lakukan logika untuk menyimpan atau mengupdate data

    setInputData('');
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  return (
    <Box sx={{ backgroundColor: '#1976D2', borderRadius: '10px', pt: 1 }}>
      <Grid container spacing={2} sx={{ m: 1 }}>
        <Grid xs={4}>
          {/* Search Component */}
        </Grid>
        <Grid xs={4}>
          <Button
            sx={{ borderColor: 'white', color: 'white', marginLeft: '750px' }}
            variant="outlined"
            onClick={() => {navigate("/add-room")}}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ maxHeight: '300px' }}>
        <Table aria-label="YUSROOM" stickyHeader>
          <TableHead sx={{ backgroundColor: 'blue' }}>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item,index) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <img src={`${item.image}`} width={80} alt="Room" />
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {item.is_active === 1 ? (
                    <Box sx={{ backgroundColor: 'pink', color: 'red', width: '60px', height: '30px', padding: 0.5, borderRadius: '5px' }}>tersedia</Box>
                  ) : (
                    <Box sx={{ backgroundColor: 'silver', color: 'white', width: '97px', height: '30px', padding: 0.5, borderRadius: '5px' }}>tidak Tersedia</Box>
                  )}
                </TableCell>
                <TableCell>
                   <Button
                      icon={<EditIcon />}
                      className="btn-edit"
                      onClick={() => editData(data)}
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
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{ width: 400, borderRadius: '12px', padding: '16px 32px 24px 32px', backgroundColor: 'white', boxShadow: '0px 2px 24px rgba(0, 0, 0, 0.5)' }}>
          <h2>{modalTitle}</h2>
          <TextField label="Data" value={inputData} onChange={handleChange} fullWidth />
          <Button variant="contained" onClick={handleSaveData}>
            Simpan
          </Button>
          <Button variant="contained" onClick={handleCloseModal}>
            Batal
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditDataPage;
