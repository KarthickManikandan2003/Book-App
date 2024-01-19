import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  // Validation function for email
  const isEmailValid = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  // Validation function for password
  const isPasswordValid = (password) => {
    // Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and a minimum length of 8 characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!isEmailValid(email)) {
      handleError("Invalid email address.");
      return;
    }

    if (!isPasswordValid(password)) {
      handleError(
        "Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters long."
      );
      return;
    }

    try {
      const { data } = await axios.post(
        "https://bookapp-y9m7.onrender.com/api/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message, email } = data;
  
      if (success) {
        console.log(data)
        localStorage.setItem("userEmail", email); // Store email in local storage
  
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error(error);
    }
    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: "20px", width: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h4" gutterBottom>
          Sign Up 
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={email}
            variant="outlined"
            margin="normal"
            onChange={handleOnChange}
          />
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={username}
            variant="outlined"
            margin="normal"
            onChange={handleOnChange}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={password}
            variant="outlined"
            margin="normal"
            onChange={handleOnChange}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "16px" }}
          >
            Submit
          </Button>
        </form>
        <Typography variant="body2" sx={{ marginTop: "16px" }}>
          Already have an account?{" "}
          <Link to="/login">Login</Link> 
        </Typography>
      </Paper>
      <ToastContainer />
    </Box>
  );
};

export default Signup;
