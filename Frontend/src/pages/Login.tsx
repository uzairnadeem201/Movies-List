// LoginPage.tsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveAuthToken } from "../utils/auth";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  // Define the type for login form values
  interface LoginFormValues {
    email: string;
    password: string;
  }

  // Validation schema using Yup
  const validationSchema = Yup.object<LoginFormValues>({
    email: Yup.string().email("Invalid email.").required("Email is required."),
    password: Yup.string().required("Password is required."),
  });

  // Formik hook for form management
  const formik = useFormik<LoginFormValues>({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      setSubmitting(true); // Indicate that the form is submitting

      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login", // Your login API endpoint
          values, // Axios automatically serializes this to JSON
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data; // Axios wraps the actual response data in a 'data' property

        if (response.status >= 200 && response.status < 300) {
          alert(`Login successful!\n${data.message || 'Welcome back!'}`);
          resetForm(); // Clear the form fields on successful login
          // Typically, after a successful login, you'd store the token
          // and redirect the user to a protected route (e.g., dashboard).
          if (data.token) {
             saveAuthToken(data.token); // Example: Store token in localStorage
          }
          navigate('/dashboard'); // Navigate to your dashboard or home page
          console.log("Auth Token (example):", data.token); // Assuming your backend sends a token
        } else {
          console.error("Login failed:", data.message || "Something went wrong");
          alert(`Login failed: ${data.message || 'Please check your credentials.'}`);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorData = error.response.data;
          const errorMessage = errorData.message || "Invalid credentials. Please try again.";

          console.error("Login error:", error.response.status, errorData);
          alert(`Login failed: ${errorMessage}`);

          if (errorData.errors) {
            setErrors(errorData.errors);
          }
        } else {
          console.error("Network error or unexpected issue:", error);
          alert("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setSubmitting(false); // Reset submitting state regardless of success or failure
      }
    },
  });

  return (
    // Set overall page background to black
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      {/* Set Card background color to a dark grey */}
      <Card className="mx-auto w-full max-w-md p-4 rounded-xl shadow-xl" sx={{ backgroundColor: '#333' }}>
        <CardContent sx={{ py: 4, px: 3 }}>
          <Typography
            variant="h5"
            align="center"
            className="font-semibold"
            sx={{ mb: 4, color: 'white' }} // Set Typography text color to white
          >
            Login
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: <EmailIcon sx={{ color: 'white' }} className="mr-2" />, // Icon color white
                sx: { color: 'white' } // Input value text color white
              }}
              InputLabelProps={{
                sx: { color: 'white' } // Label color white
              }}
              FormHelperTextProps={{
                sx: { color: 'white' } // Helper text color white
              }}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: <LockIcon sx={{ color: 'white' }} className="mr-2" />, // Icon color white
                sx: { color: 'white' } // Input value text color white
              }}
              InputLabelProps={{
                sx: { color: 'white' } // Label color white
              }}
              FormHelperTextProps={{
                sx: { color: 'white' } // Helper text color white
              }}
              sx={{ mb: 4 }}
            />

            <Button
              type="submit"
              variant="contained"
              // Set Button background color to a medium grey, ensure white text
              sx={{
                backgroundColor: '#666', // Medium grey for the button
                color: 'white',        // Ensure text is white
                '&:hover': {
                  backgroundColor: '#777', // Slightly lighter grey on hover
                },
              }}
              fullWidth
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;