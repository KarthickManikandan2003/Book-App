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
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/login",
            {
              ...inputValue,
            },
            { withCredentials: true }
          );
          const { success, message, email } = data;
          if (success) {
            // Store the email in local storage
            localStorage.setItem("userEmail", inputValue.email);
    
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
          Login 
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
          Don't have an account?{" "}
          <Link to="/signup">Signup</Link>
        </Typography>
      </Paper>
      <ToastContainer />
    </Box>
  );
};

export default Login;
