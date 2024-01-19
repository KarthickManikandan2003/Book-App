import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Box, Button, Typography, List, ListItem, ListItemText, Avatar, IconButton, Modal, TextField, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BookIcon from '@mui/icons-material/Book';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import TitleBar from '../components/TitleBar';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const BookDetails = () => {
  const userEmail = localStorage.getItem('userEmail');
  const [books, setBooks] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
      if(books.owner == localStorage.getItem("userEmail")){
      
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEditClick = (bookId) => {
    // Navigate to the Display Books page with the selected book's ID
    // Replace '/display-books' with the actual path and pass the bookId as needed
    window.location.href = `/editbook/${bookId}`;
  };

  const isOwner=(book)=>{
    if(book.owner == localStorage.getItem("userEmail")){
      return true
    }
    else{
      return false
    }
  }

  const fetchUsernameByEmail = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${email}`);
      return response.data.username;
    } catch (error) {
      console.error('Error fetching username:', error);
      return '';
    }
  };
  


  return (
    <>
      <TitleBar />
                  <div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px' }}>
  <Typography variant="h4" gutterBottom style={{ fontFamily: "cursive" }}>Book Details</Typography>
</div>
                    <List>
  {books.map((book) => (
    <ListItem key={book._id} style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
      <Avatar
        src={book.coverImage}
        alt={book.title}
        style={{
          width: '100px',
          height: '150px',
          borderRadius: '20px', // Add rounded corners
          marginRight: '20px', // Add margin between avatar and details
        }}
      />
      <div style={{ flex: 1 }}>
        <ListItemText
          primary={<Typography variant="h5">{book.title}</Typography>} // Increase font size
          secondary={
            <Typography variant="body1">
              Author: {book.author}, Genre: {book.genre}, Owner: {book.owner}
            </Typography>
          } // Increase font size
        />
      </div>

      {isOwner(book) &&(
     
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          aria-label="edit"
          onClick={() => handleEditClick(book._id)}
          style={{
            width: '120px', // Increase button width for rectangular shape
            height: '60px', // Keep button height
            borderRadius: '10px', // Add rounded corners to the button (adjust values as needed)
            marginRight: '10px', // Add margin between edit and delete buttons
          }}
        >
          <EditIcon style={{ fontSize: '36px' }} />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => handleEditClick(book._id)}
          style={{
            width: '120px', // Increase button width for rectangular shape
            height: '60px', // Keep button height
            borderRadius: '10px', // Add rounded corners to the button (adjust values as needed)
          }}
        >
          <DeleteIcon style={{ fontSize: '36px' }} />
        </IconButton>
      </div>
)}
    
    </ListItem>
  ))}
</List>

                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                      <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                      </MuiAlert>
                    </Snackbar>
                  </div>
                </>
              );
            };
            
            export default BookDetails;
            