// NavBar.tsx
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { getAuthToken, removeAuthToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
}

const NavBar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = getAuthToken();
      if (!token) {
        setUser(null); // Ensure user is null if no token
        return;
      }

      try {
        const response = await axios.get<any>( // Use any or a more specific type if you know the exact response structure
          "http://localhost:3000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.user); // { id, name, email }
      } catch (error) {
        console.error("Error fetching user:", error);
        // If token is invalid or expired, clear it and redirect to login
        removeAuthToken();
        setUser(null);
        navigate("/login");
      }
    };
    fetchUser();
    // Dependency array includes navigate to satisfy react-hooks/exhaustive-deps,
    // though it's typically stable. getAuthToken and removeAuthToken are not dependencies.
  }, [navigate]);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    removeAuthToken(); // clear the auth token cookie
    handleMenuClose(); // Close the menu before navigating
    navigate("/login"); // navigate to login
  };

  const handleCreateList = () => {
    handleMenuClose(); // Close the menu
    navigate("/create-list"); // Navigate to the /create-list page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000" }} elevation={0}>
      <Toolbar className="flex items-center justify-between w-full max-w-7xl mx-auto px-4">
        {/* Logo Section */}
        <Box className="flex items-center space-x-2">
          {/* Replace with your actual logo path */}
          <img
            src="https://placehold.co/32x32/white/black?text=Logo"
            alt="logo"
            className="h-8 w-8 rounded-full" // Added rounded-full for a softer look
          />
          <Typography variant="h6" className="text-white font-bold tracking-tight">
            Letterboxd
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box className="hidden md:flex space-x-8 text-white uppercase font-medium">
          <Button color="inherit" onClick={() => navigate('/films')}>Films</Button>
          <Button color="inherit" onClick={() => navigate('/lists')}>Lists</Button>
          <Button color="inherit" onClick={() => navigate('/members')}>Members</Button>
          <Button color="inherit" onClick={() => navigate('/journal')}>Journal</Button>
        </Box>

        {/* User Info */}
        {user ? (
          <Box className="flex items-center space-x-2">
            <Button
              color="inherit"
              onClick={handleMenuOpen}
              className="normal-case"
              startIcon={<Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main' }}>{user.name[0]}</Avatar>} // Added bgcolor
              sx={{ color: 'white' }} // Ensure button text is white
            >
              {user.name}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                sx: {
                  backgroundColor: '#333', // Dark background for menu items
                  color: 'white',        // White text for menu items
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleCreateList}>
                Create List {/* Added onClick handler */}
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

