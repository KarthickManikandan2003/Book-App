import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Button, Typography, Snackbar, Paper, Grid, Fade, Container
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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

const EditBook = () => {
  //store the useremail in localstorage to give user authentication
  const userEmail = localStorage.getItem('userEmail'); 
  let { id } = useParams();
  const [books, setBooks] = useState([]);
  const [editBookData, setEditBookData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    console.log('ID:', id); // Check if the id parameter is correct
    fetchBooks(); // Fetch book details when the component mounts
  }, [id]);


  //fetch the book details from backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`https://bookapp-y9m7.onrender.com/books/${id}`);
      // Check the response data
      setEditBookData(response.data); // Update editBookData
      console.log('Response Data:', editBookData);
      console.log(userEmail)
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  //function to delete a book
  const deleteBook = async () => {
    try {
     const response = await axios.delete(`https://bookapp-y9m7.onrender.com/books/${editBookData._id}`);

      setBooks(books.filter((book) => book._id !== id));
      if(response.status==200){
        navigate("/")
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  //function to handle the changes done
  const handleEditBookChange = (e) => {
    setEditBookData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  //save the changes in the database
  const submitEditBook = async () => {
    try {

      //check for mandatory fields
      if (!editBookData.title || !editBookData.author) {
        setSnackbarMessage('Title and Author are required fields');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return; // Don't proceed if required fields are missing
      }


      const response =  await axios.put(`https://bookapp-y9m7.onrender.com/books/${editBookData._id}`, editBookData);
      console.log(response);
      fetchBooks(); // Refresh the books list
      setSnackbarMessage('Book updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      if(response.status==200){
        navigate("/")
      }
    } catch (error) {
      console.error('Error updating book:', error);
      setSnackbarMessage('Cannot update book');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  //check if the book owner is the user
  const isOwner = (book) => {
    return book.owner === userEmail;
  };
  

    return (
      <ThemeProvider theme={theme}>
      <TitleBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container direction="column" alignItems="center" justifyContent="center" spacing={4}>
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Paper elevation={3} sx={{ p: 2, borderRadius: '16px' }}>
                  <Typography variant="h5" gutterBottom align="center" style={{ fontFamily: "cursive" }}>
                    Update the book
                  </Typography>
                  <form noValidate autoComplete="off">
            <CssTextField
              label="Title"
              name="title"
              fullWidth
              margin="normal"
              value={editBookData?.title || ''}
              onChange={handleEditBookChange}
            />
            <CssTextField
              label="Author"
              name="author"
              fullWidth
              margin="normal"
              value={editBookData?.author || ''}
              onChange={handleEditBookChange}
            />
            <CssTextField
              label="Genre"
              name="genre"
              fullWidth
              margin="normal"
              value={editBookData?.genre || ''}
              onChange={handleEditBookChange}
            />
            <CssTextField
              label="Cover Image URL"
              name="coverImage"
              fullWidth
              margin="normal"
              value={editBookData?.coverImage || ''}
              onChange={handleEditBookChange}
            />
            {isOwner(editBookData) && (
            <div>
              <Button
                onClick={submitEditBook}
                  variant="contained"
                  sx={{
                    borderRadius: '20px', // Curved vertices
                    padding: '10px 20px',
                    margin: '10px',
                    backgroundColor: '#4caf50', // Green color for Save button
                    '&:hover': {
                    backgroundColor: '#388e3c', // Darker shade on hover
                    }
                  }}
              >
                Save Changes
              </Button>
              <Button
                onClick={deleteBook}
                variant="contained"
                sx={{
                  borderRadius: '20px', // Curved vertices
                  padding: '10px 20px',
                  margin: '10px',
                  backgroundColor: '#f44336', // Red color for Delete button
                  '&:hover': {
                    backgroundColor: '#d32f2f', // Darker shade on hover
                  }
                }}
              >
                Delete Book
              </Button>
            </div>
           )}
          </form>
        </Paper>
      </Fade>
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
};

export default EditBook;
