import React from "react";
import { Box, Typography, Link, Button } from "@mui/material";
import { Instagram, Twitter, Facebook, YouTube } from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#1c1c1c",
        paddingY: 3,
        paddingX: { xs: 2, md: 4 },
        color: "white",
      }}
      className="flex flex-col items-center space-y-2"
    >
      {/* Upper links */}
      <Box className="flex flex-wrap justify-center gap-x-4 mb-2">
        {[
          "About",
          "Pro",
          "News",
          "Apps",
          "Podcast",
          "Year in Review",
          "Gifts",
          "Help",
          "Terms",
          "API",
          "Contact",
        ].map((item) => (
          <Button
            key={item}
            href="#"
            size="small"
            color="inherit"
            sx={{
              opacity: 0.8,
              textTransform: "none",
              "&:hover": { opacity: 1 },
            }}
          >
            {item}
          </Button>
        ))}
      </Box>

      {/* Attribution */}
      <Typography variant="caption" color="white" sx={{ opacity: 0.6, mb: 2 }}>
        © Letterboxd Limited. Made by{" "}
        <Link href="#" color="inherit" underline="hover">
          fans
        </Link>{" "}
        in Aotearoa New Zealand. Film data from{" "}
        <Link href="#" color="inherit" underline="hover">
          TMDB
        </Link>
        .{" "}
        <Link href="#" color="inherit" underline="hover">
          Mobile site
        </Link>
        .
      </Typography>

      {/* Social icons */}
      <Box className="flex space-x-3 mt-1 opacity-80">
        <Link href="#" color="inherit" aria-label="Instagram">
          <Instagram fontSize="small" />
        </Link>
        <Link href="#" color="inherit" aria-label="Twitter">
          <Twitter fontSize="small" />
        </Link>
        <Link href="#" color="inherit" aria-label="Facebook">
          <Facebook fontSize="small" />
        </Link>
        <Link href="#" color="inherit" aria-label="YouTube">
          <YouTube fontSize="small" />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;


