// TitleBar.js
import React from 'react';
import { AppBar, Toolbar, Box, Button, Typography, IconButton } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useNavigate } from 'react-router-dom';

const TitleBar = () => {
  const navigate = useNavigate();

  const handleAddBooksClick = () => {
    navigate('/addbook'); // Navigate to AddBook page
  };
  
  const handleHomeClick = () => {
    navigate('/'); // Navigate to ListItem page
  };

  const handleBookDetailsClick = () => {
    navigate('/bookdetails'); // Navigate to ListItem page
  };

  const handleLogoutClick = () => {
    // Implement your logout logic here, e.g., clearing local storage
    localStorage.clear();
    navigate('/login'); // Navigate to the login page after logout
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, #6a1b9a, #00bcd4)', boxShadow: 'none', paddingTop: '20px', paddingBottom: '20px' }}>
      <Toolbar>
        {/* Left side icons */}
        <Box display="flex" alignItems="center" flexGrow={1}>
        <IconButton color="inherit" onClick={handleHomeClick}>
            <LibraryBooksIcon sx={{ fontSize: 32, color: 'white' }} />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ color: 'white', fontFamily: 'cursive' }}>
            Book Haven
          </Typography>
        </Box>

        {/* Right side buttons */}
        <Box display="flex" alignItems="center">
          <Button color="inherit" sx={{ color: 'white', marginLeft: 2, fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'none' }} onClick={handleHomeClick}>Home</Button>
          <Button color="inherit" sx={{ color: 'white', marginLeft: 2, fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'none' }} onClick={handleAddBooksClick}>Add a Book</Button>
          <Button color="inherit" sx={{ color: 'white', marginLeft: 2, fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'none' }} onClick={handleBookDetailsClick}>Book Details</Button>
          <Button color="inherit" sx={{ color: 'white', marginLeft: 2, fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'none' }} onClick={handleLogoutClick}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
