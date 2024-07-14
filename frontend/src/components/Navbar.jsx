// src/components/Navbar.js
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import {Logout} from '../components/Logout'
import AddHotelPage from '../pages/AddHotelPage';
const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  return (
    <div className="bg-green-800 text-white"  position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Hotel Booking
        </Typography>
        <ul className="flex gap-4 cursor-pointer">
        {!token &&<li className='hover:text-zinc-300'
                        onClick={() => navigate("/register")}
                    >Register</li> }

                    {!token && <li className='hover:text-zinc-300'
                        onClick={() => navigate("/login")}
                    >Login</li>}
        
        {token && <Logout/>}
        </ul>
       
      </Toolbar>
    </div>
  );
};

export default Navbar;
