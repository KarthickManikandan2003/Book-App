import React, { useEffect, useState } from 'react';
import AddBook from './pages/AddBook';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetails from './pages/BookDetails';
import ListBook from './pages/ListBook';
import EditBook from './pages/EditBook';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  
    return(
      <><BrowserRouter>
      <Routes>
        <Route path="/addbook" element={<AddBook />}>
        
        </Route>
        <Route path="/bookdetails" element={<BookDetails />}>
    
        </Route>
        <Route path="/" element={<ListBook />}>
    
        </Route>
        <Route path="/editbook/:id" element={<EditBook />}>

        </Route> 
        <Route path="/signup" element={<Signup />}>
    
        </Route>
        <Route path="/login" element={<Login />}>
    
        </Route>
      </Routes>
    </BrowserRouter></>
      
    );
}

export default App;
