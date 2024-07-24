// src/components/Navbar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import { Logout } from '../components/Logout';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const token = localStorage.getItem('token');
  const isSeller = localStorage.getItem('role') === 'seller';
  const isBuyer = localStorage.getItem('role') === 'customer';
  const navigate = useNavigate();
  
  const handleHome = () => {
    navigate('/');
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  }

  return (
    <div className="text-black" position="static">
      <Toolbar className="flex justify-between items-center">
        <IconButton onClick={handleHome} edge="start" color="inherit" aria-label="menu">
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" className="flex-grow">
          Flat Booking
        </Typography>
        <div className="md:hidden">
          <IconButton onClick={toggleDrawer(true)} edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </div>
        <div className="hidden md:flex gap-4 cursor-pointer">
          {!token && (
            <li className="hover:text-zinc-300" onClick={() => navigate("/register")}>
              Register
            </li>
          )}
          {!token && (
            <li className="hover:text-zinc-300" onClick={() => navigate("/login")}>
              Login
            </li>
          )}
          {isSeller && (
            <li className="font-semibold hover:text-zinc-500" onClick={() => navigate("/my-listings")}>
              My Listings
            </li>
          )}
          {isBuyer && (
            <li className="font-semibold hover:text-zinc-500" onClick={() => navigate("/bookings")}>
              My Bookings
            </li>
          )}
          {isSeller && (
            <li className="font-semibold hover:text-zinc-500" onClick={() => navigate("/add-flat")}>
              Add Flat/Room
            </li>
          )}
          {token && <Logout />}
        </div>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="w-64 p-4 flex flex-col">
          <div className="flex justify-end">
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <ul className="flex flex-col gap-4 mt-4 cursor-pointer">
            {!token && (
              <li className="hover:text-zinc-300" onClick={() => navigate("/register")}>
                Register
              </li>
            )}
            {!token && (
              <li className="hover:text-zinc-300" onClick={() => navigate("/login")}>
                Login
              </li>
            )}
            {isSeller && (
              <li className="font-semibold hover:text-zinc-500" onClick={() => navigate("/my-listings")}>
                My Listings
              </li>
            )}
            {isBuyer && (
              <li className="font-semibold hover:text-zinc-500" onClick={() => navigate("/bookings")}>
                My Bookings
              </li>
            )}
            {isSeller && (
              <li className="font-semibold hover:text-zinc-500" onClick={() => navigate("/add-flat")}>
                Add Flat/Room
              </li>
            )}
            {token && <Logout />}
          </ul>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
