const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Add a new book
router.post('/', async (req, res
) => {
const book = new Book(req.body);
try {
const newBook = await book.save();
res.status(201).json(newBook);
} catch (error) {
res.status(400).json({ message: error.message });
}
});

// Update a book
router.put('/:id', async (req, res) => {
try {
const updatedBook = await Book.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true } // This option returns the document after update
);
if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
res.json(updatedBook);
} catch (error) {
res.status(500).json({ message: error.message });
}
});

// Delete a book
router.delete('/:id', async (req, res) => {
try {
const deletedBook = await Book.findByIdAndDelete(req.params.id);
if (!deletedBook) return res

.status(404).json({ message: 'Book not found' });
res.json(deletedBook);
} catch (error) {
res.status(500).json({ message: error.message });
}
});

module.exports = router;