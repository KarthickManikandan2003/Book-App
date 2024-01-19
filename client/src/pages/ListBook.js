// ListBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Grid, Card, CardContent, Typography, Box, Dialog, DialogContent, DialogTitle, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import TitleBar from '../components/TitleBar';
import defaultCoverImage from '../images/default_cover.jpg';


const theme = createTheme({
    palette: {
      primary: {
        main: '#455A64', // Adjust the main color to match the vibrant UI
      },
      secondary: {
        main: '#455A64', // Adjust the secondary color to match the vibrant UI
      },
      background: {
        default: '#f5f5f5',
      },
      btn_clr: {
          main: '#00bcd4',
      }
    },
    components: {
      // Custom card styling to match the UI
      MuiCard: {
        styleOverrides: {
          root: {
            transition: '0.3s',
            '&:hover': {
              boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
            },
          },
        },
      },
    },
    // Custom styles for the AppBar
    overrides: {
      MuiAppBar: {
        root: {
          background: 'linear-gradient(to right, #6a1b9a, #00bcd4)', // Custom gradient background
          color: 'white', // Text color
          boxShadow: 'none', // No box shadow
        },
      },
      MuiToolbar: {
        root: {
          display: 'flex',
          justifyContent: 'space-between',
        },
      },
      MuiButton: {
        root: {
          color: 'white', // Button text color
          marginLeft: '8px', // Add some spacing between buttons
        },
      },
    },
  });


  const ListBook = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    
    useEffect(() => {
        // Check if the user is authenticated
        const mailId = localStorage.getItem('userEmail');

      if (!mailId) {
        // Redirect to another page if 'maidid' is not found
        navigate('/login'); // Replace '/login' with the appropriate route
      }
    
  // Fetch books from the backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://bookapp-y9m7.onrender.com/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
    
      fetchBooks();
    }, [navigate, removeCookie, cookies]);

  //when clicked on grid should display dialog box
  const handleGridClick = (book) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //handle edit button in dialog box
  const handleEditClick = (bookId) => {
    // Navigate to the Display Books page with the selected book's ID
    // Replace '/display-books' with the actual path and pass the bookId as needed
    window.location.href = `/editbook/${bookId}`;
  };


  return (
    <ThemeProvider theme={theme}>
      <TitleBar />
      <Container maxWidth="lg" sx={{ mt: 4, padding: 0}}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }} style={{ fontFamily: "cursive" }}>Book Collections</Typography>
        <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={4} lg={3} xl={3}>
            <Card sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'none',
              height: '400px', // Increased height
              backgroundImage: `url(${book.coverImage || defaultCoverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              '&:hover .MuiCardContent-root': { display: 'block' },
            }}
            onClick={() => handleGridClick(book)}
          >
          <CardContent sx={{ flexGrow: 1, display: 'none', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white' }}>
            <Typography gutterBottom variant="h5" component="h2">
              {book.title}
            </Typography>
            <Typography>
              Author: {book.author}
            </Typography>
            <Typography>
              Genre: {book.genre}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Container>
<Dialog 
  open={openDialog} 
  onClose={handleCloseDialog}
  sx={{ '& .MuiDialog-paper': { width: '400px', maxHeight: '90vh' } }} // Fixed width and maximum height
  >
    <DialogTitle sx={{ textAlign: 'center', backgroundColor: theme.palette.primary.main, color: 'white' }}>Book Details</DialogTitle>
    <DialogContent dividers> {/* dividers for better visual separation */}
      {selectedBook && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom>{selectedBook.title}</Typography>
          <Typography variant="body1" gutterBottom>Author: {selectedBook.author}</Typography>
          <Typography variant="body1" gutterBottom>Genre: {selectedBook.genre}</Typography>
          {/* ...other details... */}
          <IconButton 
            onClick={() => handleEditClick(selectedBook._id)}
            sx={{ marginTop: '20px' }} // Additional styling for the button
          >
            <EditIcon />
          </IconButton>
        </Box>
      )}
    </DialogContent>
  </Dialog>
  </ThemeProvider>

  );
}

export default ListBook;
