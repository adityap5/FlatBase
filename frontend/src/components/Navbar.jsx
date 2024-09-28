// src/components/Navbar.js
import React, { useState } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import { Logout } from '../components/Logout';
import logo from '/logo.png';
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
    <div className="text-white bg-zinc-400 rounded-xl mt-2" >
      <Toolbar className="flex justify-between items-center">
        <IconButton onClick={handleHome} edge="start" color="inherit" aria-label="menu">
          <img className ="w-5" src={logo} alt="logo" />
        </IconButton>
        <h1 className="flex-grow text-3xl font-zain">
         FlatBase
        </h1>
        <div className="md:hidden">
          <IconButton onClick={toggleDrawer(true)} edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </div>
        <div className="hidden md:flex gap-4 text-lg cursor-pointer">
          <NavLink className={({isActive})=>isActive ?'text-[#A5C9CA] font-semibold': 'font-semibold hover:text-[#A5C9CA]'}
          to="/category">
          Category
          </NavLink>
          {!token && (
            <NavLink className={({isActive})=>isActive ?'text-[#A5C9CA] font-semibold': 'font-semibold hover:text-[#A5C9CA]'} 
             to="/register">
              Register
            </NavLink>
          )}
          {!token && (
            <NavLink className={({isActive})=>isActive ?'text-[#A5C9CA] font-semibold': 'font-semibold hover:text-green-300'}  to="/login">
              Login
            </NavLink>
          )}
          {isSeller && (
            <NavLink 
            className={({isActive})=>isActive ?'text-[#A5C9CA] font-semibold': 'font-semibold hover:text-[#A5C9CA]'} 
            to="/mylistings">
              My Listings
            </NavLink>
          )}
          {isBuyer && (
            <NavLink className={({isActive})=>isActive ?'text-[#A5C9CA] font-semibold': 'font-semibold hover:text-[#A5C9CA]'}
              to="/bookings">
              My Bookings
            </NavLink>
          )}
          {isSeller && (
            <NavLink className={({isActive})=>isActive ?'text-[#A5C9CA] font-semibold': 'font-semibold hover:text-[#A5C9CA]'} 
             to="/add-flat">
              Add Flat/Room
            </NavLink>
          )}
          {token && <Logout />}
        </div>
      </Toolbar>
      <Drawer  anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="w-64 p-4 flex flex-col bg-[#222831] text-[#EEEEEE]">
          <div className="flex justify-end">
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon className="text-[#EEEEEE]" />
            </IconButton>
          </div>
          <ul className="flex flex-col gap-4 mt-4 cursor-pointer">
          <NavLink className={({isActive})=>isActive ?'text-[#A5C9CA] font-semibold': 'font-semibold hover:text-[#A5C9CA]'}
          to="/category">
          Category
          </NavLink>
            {!token && (
              <NavLink className={({isActive})=>isActive ?'text-[#A5C9CA] font-semibold': 'font-semibold hover:text-[#A5C9CA]'}  to="/register">
                Register
              </NavLink>
            )}
            {!token && (
              <NavLink className={({isActive})=>isActive ?'text-[#A5C9CA] font-semibold': 'font-semibold hover:text-green-300'} to="/login">
                Login
              </NavLink>
            )}
            {isSeller && (
              <NavLink className={({isActive})=>isActive ?'text-[#A5C9CA] font-semibold': 'font-semibold hover:text-[#A5C9CA]'} to="/mylistings">
                My Listings
              </NavLink>
            )}
            {isBuyer && (
              <NavLink className={({isActive})=>isActive ?'text-[#A5C9CA] font-semibold': 'font-semibold hover:text-[#A5C9CA]'} to="/bookings">
                My Bookings
              </NavLink>
            )}
            {isSeller && (
              <NavLink className={({isActive})=>isActive ?'text-[#A5C9CA] font-semibold': 'font-semibold hover:text-[#A5C9CA]'} to="/add-flat">
                Add Flat/Room
              </NavLink>
            )}
            {token && <Logout/>}
          </ul>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
