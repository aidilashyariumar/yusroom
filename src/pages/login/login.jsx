import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';
import { Navigate } from 'react-router';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {

    axios.post('http://127.0.0.1:8000/api/login', { username, password })
      .then(response => {
        // Jika login berhasil, atur status login dan arahkan ke halaman beranda
        setIsLoggedIn(true);
        return <Navigate to="/home" />;
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  };

  const formControlStyle = {
    m: 1,
    width: '30ch',
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white', // Set the color of the underline when the input is not focused
    },
    // ...lanjutkan gaya yang lain
  };

  return (
    <div className="container">
      <h1 className="icon">
        <PersonIcon className="con" />
      </h1>
      <h2 className="user animated">User Login</h2>
      <div className="input">
        <TextField
          sx={formControlStyle}
          id="standard-basic"
          label="Name"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FormControl sx={formControlStyle} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          size="small"
          sx={{ width: 270, mt: 2 }}
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
        {errorMessage && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
