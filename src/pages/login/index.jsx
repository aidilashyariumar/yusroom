import React, { useEffect, useState } from 'react';
import {
//   Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  
} from '@mui/material';
import './login.css'
import PersonIcon from '@mui/icons-material/Person';
// import { makeStyles } from '@mui/styles';
// import loginBg from '../../assets/img/login_bg.png';
import { useNavigate } from 'react-router-dom';
import axios from '../../helper/axios';
import { useUserStore } from '../../store/userStore';



const LoginPage = () => {
//   const classes = useStyles();
//   const history = useHistory();
useEffect(() => {
    if (localStorage.getItem('auth')) {
      window.location.href='/'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const [loading, setLoading] = useState(false);

  const auth = async ({ username, password }) => {
    setLoading(true);

    if (username.length === 0 || password.length === 0) {
      setLoading(false);
      
      return;
    }

    try {
      const response = await axios.post('/admin/login', { username, password });

      const data = response.data
      console.log(data.data)

      if (data.responseCode !== 200) {
        setLoading(false)
        return
      }

      const { access_token, name, access_role } = data.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('name', name);
      localStorage.setItem('auth', true);
      localStorage.setItem('access_role', JSON.stringify(access_role));


      setUser({ name, access_role });
      setLoading(false);
      window.location.href='/'
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const formControlStyle = {
    m:0.5,
    width: '30ch',
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white', // Set the color of the underline when the input is not focused
    },
    // ...lanjutkan gaya yang lain
  };
  return (
    // <div className={classes.container}>
    
      
     <div className="container">
     {/* <h1 className="icon">
        <PersonIcon className="con" />
      </h1> */}

      <h1 className='user animated'>Yuscorp Bussiness</h1>
      <h6 className='kata'>Silahkan Masukkan Username & Password anda</h6>
          <div className="input">
          <form
            // className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
              auth({ username: e.target.username.value, password: e.target.password.value });
            }}

          >
            <TextField
              label="Username"
              name="username"
              sx={formControlStyle}
              id="standard-basic"
              variant="outlined"
              required
            />
            <TextField
              label="Password"
              name="password"
              sx={formControlStyle}
              variant="outlined"
              type="password"
              required
            />
            <FormControlLabel
              control={<Checkbox name="remember_me" color="primary" />}
              label="Ingat saya"
            //   className={classes.input}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: 270 }}
              disableElevation
              fullWidth
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </form>
          </div>
          </div>
        
    // </div>
  );
};

export default LoginPage;
