const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('../server/routes/books'); // Import the routes
const authRoute = require("../server/routes/authRoute")

const app = express();

// Middleware
const corsOptions = {
  origin: "https://book-app-wheat-six.vercel.app/api", // Replace with your frontend's URL
  credentials: true, // Enable cookies and other credentials
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://karthickmanikandan:book%40123@cluster0.ci7dp7g.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/books', bookRoutes); // Use the book routes
app.use("/api", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
