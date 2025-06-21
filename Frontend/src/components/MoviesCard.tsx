import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

interface MoviesCardProps {
  movie: Movie;
}

const MoviesCard: React.FC<MoviesCardProps> = ({ movie }) => {
  return (
    <Card className="bg-[#222] text-white shadow-xl rounded-lg overflow-hidden w-64 h-full">
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="h-80 w-full object-cover"
      />
      <CardContent className="p-3 flex flex-col gap-1">
        <Typography variant="h6" className="font-semibold truncate">
          {movie.title}
        </Typography>
        <Typography variant="body2" className="text-xs opacity-70 mb-1">
          {new Date(movie.release_date).toLocaleDateString()}
        </Typography>
        <Typography
          variant="body2"
          className="text-xs opacity-70 overflow-hidden"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MoviesCard;
