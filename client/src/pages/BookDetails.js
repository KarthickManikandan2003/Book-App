import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Avatar, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MuiAlert from '@mui/material/Alert';
import TitleBar from '../components/TitleBar';


const BookDetails = () => {
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

  //fetch book details from the backend 
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


  const handleEditClick = (bookId) => {
    // Navigate to the EditBook page with the selected book's ID
    // Replace '/editbooks' with the actual path and pass the bookId as needed
    window.location.href = `/editbook/${bookId}`;
  };

  //to check if the user is the owner of the book(who added)
  const isOwner=(book)=>{
    if(book.owner == localStorage.getItem("userEmail")){
      return true
    }
    else{
      return false
    }
  }
  

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

          {/*to check if the onwner of the book is same as user*/}
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
            