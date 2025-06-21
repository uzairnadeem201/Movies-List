// SignupPage.tsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  interface SignupFormValues {
    name: string;
    email: string;
    password: string;
  }

  const validationSchema = Yup.object<SignupFormValues>({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email("Invalid email.").required("Email is required."),
    password: Yup.string().required("Password is required.").min(8, "Min 8 chars."),
  });

  const formik = useFormik<SignupFormValues>({
    initialValues: { name: "", email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      setSubmitting(true);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/signup",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;

        if (response.status >= 200 && response.status < 300) {
          alert(`Signup successful!\n${data.message || 'Welcome!'}`);
          resetForm();
          navigate('/login');
        } else {
          console.error("Signup failed:", data.message || "Something went wrong");
          alert(`Signup failed: ${data.message || 'Please try again.'}`);

          if (data.errors) {
            setErrors(data.errors);
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorData = error.response.data;
          const errorMessage = errorData.message || "An error occurred during signup.";

          console.error("Signup error:", error.response.status, errorData);
          alert(`Signup failed: ${errorMessage}`);

          if (errorData.errors) {
            setErrors(errorData.errors);
          }
        } else {
          console.error("Network error or unexpected issue:", error);
          alert("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      {/* Set Card background color to a dark grey */}
      <Card className="mx-auto w-full max-w-md p-4 rounded-xl shadow-xl" sx={{ backgroundColor: '#333' }}>
        <CardContent sx={{ py: 4, px: 3 }}>
          <Typography
            variant="h5"
            align="center"
            className="font-semibold"
            sx={{ mb: 4, color: 'white' }}
          >
            Sign Up
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              InputProps={{
                startAdornment: <AccountCircleIcon sx={{ color: 'white' }} className="mr-2" />,
                sx: { color: 'white' }
              }}
              InputLabelProps={{
                sx: { color: 'white' }
              }}
              FormHelperTextProps={{
                sx: { color: 'white' }
              }}
              sx={{ mb: 3 }}
            />

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
                startAdornment: <EmailIcon sx={{ color: 'white' }} className="mr-2" />,
                sx: { color: 'white' }
              }}
              InputLabelProps={{
                sx: { color: 'white' }
              }}
              FormHelperTextProps={{
                sx: { color: 'white' }
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
                startAdornment: <LockIcon sx={{ color: 'white' }} className="mr-2" />,
                sx: { color: 'white' }
              }}
              InputLabelProps={{
                sx: { color: 'white' }
              }}
              FormHelperTextProps={{
                sx: { color: 'white' }
              }}
              sx={{ mb: 4 }}
            />

            <Button
              type="submit"
              variant="contained"
              // Set Button background color to a medium grey
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
              {formik.isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;






