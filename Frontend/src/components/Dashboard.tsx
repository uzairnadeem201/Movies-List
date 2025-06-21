import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import { getAuthToken } from "../utils/auth";
import MoviesCard from "../components/MoviesCard";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Fetch user
    const fetchUser = async () => {
      try {
        const token = getAuthToken();
        if (!token) return;
        const resp = await axios.get("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(resp.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();

    // Fetch movies and pick 5 at random
    const fetchMovies = async () => {
      try {
        const resp = await axios.get(
          "https://api.themoviedb.org/3/movie/now_playing",
          {
            params: {
              api_key: "b2abd7a18a4cf604ffd609da3de40347",
              language: "en-US",
              page: 1,
            },
          }
        );

        const allMovies = resp.data.results as Movie[];
        const picked = allMovies.sort(() => 0.5 - Math.random()).slice(0, 5);
        setMovies(picked);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <Box className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 gap-10">
      {user && (
        <Typography variant="h4" className="font-bold mb-8 text-center mb-30">
          Welcome back, {user.name}! 🍿
        </Typography>
      )}

      <Box className="flex flex-wrap gap-6 justify-center mb-60">
        {movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;

