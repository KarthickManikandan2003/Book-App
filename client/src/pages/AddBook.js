import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, TextField, Button, Grid, Card, CardMedia, CardContent, CardActions, IconButton, AppBar, Toolbar, Tooltip, Fade, Paper, Box, styled
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BookIcon from '@mui/icons-material/Book';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import CssTextField from '../components/CssTextField';

const theme = createTheme({
  palette: {
    primary: {
      main: '#455A64',
    },
    secondary: {
      main: '#455A64',
    },
    background: {
      default: '#f5f5f5',
    },
    btn_clr: {
      main: '#00bcd4',
    }
  },
  components: {
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
  overrides: {
    MuiAppBar: {
      root: {
        background: 'linear-gradient(to right, #6a1b9a, #00bcd4)',
        color: 'white',
        boxShadow: 'none',
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
        color: 'white',
        marginLeft: '8px',
      },
    },
  },
});

const AddBook = () => {
  const userEmail = localStorage.getItem('userEmail')
  const [books, setBooks] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
    const [newBook, setNewBook] = useState(() => {
      // Retrieve book data from local storage or initialize with default values
      const savedBook = localStorage.getItem('newBook');
      return savedBook ? JSON.parse(savedBook) : { title: '', author: '', genre: '', coverImage: '', owner:userEmail};
    });

    const isValidUrl = (url) => {
      if (url === '') {
        return true; // Allow empty URL
    }
      const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return urlPattern.test(url);
  };

  // Function to fetch books from the backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };


  // Function to add a new book
  const addBook = async () => {

    try {

      if (!newBook.title || !newBook.author) {
        setSnackbarMessage('Title and Author are required fields');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return; // Don't proceed if required fields are missing
      }

      if (!isValidUrl(newBook.coverImage)) {
        setSnackbarMessage('Invalid image URL');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
    }

      const response = await axios.post('http://localhost:5000/books', newBook);
      setBooks([...books, response.data]);
      setNewBook({
        title: '',
        author: '',
        genre: '',
        coverImage: '',
        owner:userEmail
      });
      console.log(newBook)
      // After successfully adding a book
      setSnackbarMessage('Book added successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Function to delete a book by ID
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  
  // Fetch books from the backend when the component mounts
  useEffect(() => {
    localStorage.setItem('newBook', JSON.stringify(newBook));
  }, [newBook]);

  

  
  return (
    <ThemeProvider theme={theme}>

    <TitleBar />
  
      <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={4}>
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: '16px' }}>
                <Typography variant="h5" gutterBottom align="center" style={{ fontFamily: "cursive" }}>
                  Add a New Book
                </Typography>
                <form>
                  <CssTextField 
                    label="Title" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    value={newBook.title} 
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  />
                  <CssTextField 
                    label="Author" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    value={newBook.author} 
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  />
                  <CssTextField 
                    label="Genre" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    value={newBook.genre} 
                    onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                  />
                  <CssTextField
                    label="Cover Image URL" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    value={newBook.coverImage} 
                    onChange={(e) => setNewBook({ ...newBook, coverImage: e.target.value })}
                  />
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    startIcon={<AddIcon />} 
                    onClick={addBook} 
                    fullWidth
                    sx={{ mt: 2, borderRadius: '20px' }}
                  >
                    Add Book
                  </Button>
                </form>
              </Paper>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button 
              component={Link} // Use the Link component for navigation
              to="/" // Set the path to the "Display Book" page
              variant="contained" 
              color="primary" 
              fullWidth
              sx={{ mt: 2, borderRadius: '20px' }}
            >
              Go To Book Collections
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      </ThemeProvider>
  );

}

export default AddBook;

