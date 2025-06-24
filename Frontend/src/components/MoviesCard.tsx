import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  release_date: string;
}

interface MoviesCardProps {
  movie: Movie;
  small?: boolean;
}

const MoviesCard: React.FC<MoviesCardProps> = ({ movie, small }) => {
  return (
    <Card
      className={`bg-[#222] text-white shadow-xl overflow-hidden ${
        small ? "w-32" : "w-64"
      }`}
    >
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={small ? "h-40 w-full object-cover" : "h-80 w-full object-cover"}
      />
      <CardContent className={`p-2 flex flex-col gap-1 ${small ? "text-center" : ""}`}>
        <Typography
          variant={small ? "body2" : "h6"}
          className={`font-semibold ${small ? "truncate" : ""}`}
        >
          {movie.title}
        </Typography>
        {movie.release_date && (
          <Typography variant="caption" className="opacity-70">
            {new Date(movie.release_date).toLocaleDateString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MoviesCard;


