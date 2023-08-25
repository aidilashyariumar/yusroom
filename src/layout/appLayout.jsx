import { 
    Box,
    Container,
    Stack,
    Typography,
  
  } from '@mui/material'
  import React from 'react'
  import { Outlet } from 'react-router-dom'
  import Navbar from '../components/Navbar'
  import Sidebar from '../components/Sidebar'
  
  const AppLayout = () => {
    return (
      <Container maxWidth={false} sx={{ height: '100vh', display: 'flex', p: '0 !important' }} >
          <Sidebar />
          <Stack sx={{ flex: 4, bgcolor: '#fff', overflowY: 'auto', position: 'relative', boxShadow: 'inset 1px -1px 12px rgba(0, 0, 0, 0.05)', }} >
            <Navbar />
            <Box sx={{ flex:2,m:4}} >
                <Outlet/>
            </Box>
            <Box sx={{ display: 'flex', p: '12px', borderTop: '1px solid #EAEAEA' }} >
              <Typography variant='body1' sx={{ color: '#121215', m: 'auto', fontSize: '12px', fontWeight: '600' }} >
                  © Copyright 2023 - Yuscorp
              </Typography>
            </Box>
          </Stack>
      </Container>
    )
  }
  
  export default AppLayout