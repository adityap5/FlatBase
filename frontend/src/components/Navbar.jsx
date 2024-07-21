// src/components/Navbar.js
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import {Logout} from '../components/Logout'
import BookingPage from '../pages/BookingPage';
import AddHotelPage from '../pages/AddHotelPage';
const Navbar = () => {
  const token = localStorage.getItem('token');
  const isSeller = localStorage.getItem('role') === 'seller';
  const isBuyer = localStorage.getItem('role') === 'customer';
  const navigate = useNavigate()
  const handleHome =()=>{
    navigate('/');
  }
  return (
    <div className=" text-black"  position="static">
      <Toolbar>
        <IconButton  onClick={handleHome}  edge="start" color="inherit" aria-label="menu"  >
          <HomeIcon/>
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
        
        {isBuyer && <p onClick={() => navigate("/bookings")} className='font-semibold hover:text-zinc-500'>My Bookings</p>}
        {isSeller && <p onClick={() => navigate("/add-hotel")} className='font-semibold hover:text-zinc-500' >Add Flat/Room</p>}
        {token && <Logout/>}
        </ul>
       
      </Toolbar>
    </div>
  );
};

export default Navbar;
