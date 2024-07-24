// src/pages/LogoutPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

const LogoutPage = () => {
  const navigate = useNavigate();
  const handleLogin = ()=>{
    navigate('/login')
  }
  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="flex  items-center justify-center">
      <div className="p-8 max-w-sm w-full text-center mt-10">
        <LogoutIcon style={{ fontSize: 60, color: 'red' }} />
        <Typography variant="h4" className="mt-4 mb-4">
          You have been logged out😥
        </Typography>

        <p  className="mt-4 text-lg">
          We hope to see you again soon!!
        </p>
        <div className="mt-6 space-y-4">
          <button
            className=" bg-zinc-700 rounded-xl py-2 px-8 text-center"
            onClick={handleHome}
          >
          <HomeIcon /> Go to Home
          </button>
          <button
           className=" bg-zinc-700 rounded-xl py-2 px-8 text-[#76ABAE]"
            onClick={handleLogin}
          >
           <LogoutIcon /> Login Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
