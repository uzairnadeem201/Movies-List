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
      if (!token) return;

      try {
        const response = await axios.get(
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
      }
    };
    fetchUser();
  }, []);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    removeAuthToken(); // clear the auth token cookie
    navigate("/login"); // navigate to login
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000" }} elevation={0}>
      <Toolbar className="flex items-center justify-between w-full max-w-7xl mx-auto px-4">
        {/* Logo Section */}
        <Box className="flex items-center space-x-2">
          <img
            src="/path-to-your-logo.svg"
            alt="logo"
            className="h-8 w-8"
          />
          <Typography variant="h6" className="text-white font-bold tracking-tight">
            Letterboxd
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box className="hidden md:flex space-x-8 text-white uppercase font-medium">
          <Button color="inherit">Films</Button>
          <Button color="inherit">Lists</Button>
          <Button color="inherit">Members</Button>
          <Button color="inherit">Journal</Button>
        </Box>

        {/* User Info */}
        {user ? (
          <Box className="flex items-center space-x-2">
            <Button
              color="inherit"
              onClick={handleMenuOpen}
              className="normal-case"
              startIcon={<Avatar sx={{ width: 28, height: 28 }}>{user.name[0]}</Avatar>}
            >
              {user.name}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleLogout();
                }}
              >
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


