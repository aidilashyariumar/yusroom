import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useAppStore } from '../appStore';
import axios from '../helper/axios';
import { Navigate, useNavigate } from 'react-router';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


const AppBar = styled(MuiAppBar, {
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,

}));



export default function Navbar(onLogout) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const updateOpen = useAppStore((state) => state.updateOpen)
  const dopen = useAppStore((state) => state.dopen)
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`https://yusroom.be.sman17gowa.com/api/logout`); // Ganti dengan URL yang sesuai
      // localStorage.removeItem('access_token');
      localStorage.clear();
      navigate('/login')
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };




  

 

 

  return (
    <Box sx={{ flexGrow: 0.1, bgcolor: '#0264d3' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Yuscorp
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton color="inherit" onClick={handleOpen}>
              <LogoutRoundedIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Logout</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Apakah Anda yakin ingin keluar?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Batal
                </Button>
                <Button onClick={handleLogout} color="primary">
                  Logout
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
    </Box>
  );
}