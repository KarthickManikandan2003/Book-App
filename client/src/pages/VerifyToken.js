import axios from "axios";

// Function to verify the user's token on the frontend
const verifyToken = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api", {
      withCredentials: true, // Send cookies with the request
    });

    const { status, user } = response.data;

    if (status) {
      // Token is valid, user is authenticated
      console.log("User is authenticated. Username:", user);
      return true;
    } else {
      // Token is invalid or user is not authenticated
      console.log("User is not authenticated.");
      return false;
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};

export default verifyToken;
