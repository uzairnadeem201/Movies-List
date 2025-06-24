import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import { Plus, Save, X } from "lucide-react";
import axios from "axios";
import MoviesCard from "./MoviesCard";
import { getAuthToken } from "../utils/auth";

const TMDB_API_KEY = "b2abd7a18a4cf604ffd609da3de40347";

const visibilityOptions = [
  { value: "public", label: "Anyone — Public list" },
  { value: "private", label: "Only me — Private list" },
];

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  release_date: string;
}

const NewListForm: React.FC = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [ranked, setRanked] = useState(false);
  const [films, setFilms] = useState<Movie[]>([]);
  const [filmInput, setFilmInput] = useState("");

  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Search movies as user types
  useEffect(() => {
    if (filmInput.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearching(true);
      axios
        .get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: TMDB_API_KEY,
            query: filmInput,
          },
        })
        .then((res) => {
          setSearchResults(res.data.results || []);
          setIsSearching(false);
        })
        .catch(() => setIsSearching(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [filmInput]);

  const handleAddFilmFromSearch = (movie: Movie) => {
    setFilms((prev) => [...prev, movie]);
    setSearchResults([]);
    setFilmInput("");
  };

  const handleAddFilm = () => {
    if (filmInput.trim()) {
      const picked = searchResults.find((m) => m.title === filmInput);
      setFilms((prev) => [
        ...prev,
        picked || {
          id: Date.now(),
          title: filmInput,
          overview: "",
          poster_path: "",
          release_date: "",
        },
      ]);
      setFilmInput("");
      setSearchResults([]);
    }
  };

  const handleSave = async () => {
    if (films.length === 0) {
      return alert("Please add at least one movie before saving.");
    }

    const payload = {
      name: name.trim(),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      description: description.trim(),
      movies: films.map((m) => ({
        title: m.title.trim(),
        poster_path: m.poster_path || "", // send poster_path as-is
      })),
    };

    try {
      const token = getAuthToken();
      const resp = await axios.post(
        "http://localhost:3000/api/movies/list",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.status === 200) {
        alert("List created successfully!");
        // reset form
        setName("");
        setTags("");
        setDescription("");
        setFilms([]);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const whiteTextFieldProps = {
    InputLabelProps: { style: { color: "#fff" } },
    InputProps: {
      style: {
        color: "#fff",
        backgroundColor: "#1f1f1f",
        borderColor: "#444",
      },
    },
  } as any;

  return (
    <Box className="bg-[#0d0d0d] text-white p-6 rounded-lg w-full max-w-4xl mx-auto mb-32">
      <Typography variant="h4" className="mb-4 font-bold">
        New List
      </Typography>

      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4"
        {...whiteTextFieldProps}
      />

      <TextField
        fullWidth
        label="Tags"
        variant="outlined"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        helperText="Comma-separated tags"
        className="mb-4"
        {...whiteTextFieldProps}
      />

      <TextField
        select
        fullWidth
        label="Who can view"
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
        className="mb-4"
        {...whiteTextFieldProps}
      >
        {visibilityOptions.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={{ color: "#fff", backgroundColor: "#1f1f1f" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <FormControlLabel
        control={
          <Checkbox
            checked={ranked}
            onChange={(e) => setRanked(e.target.checked)}
            color="primary"
          />
        }
        label="Ranked list"
        className="mb-4"
      />

      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4"
        {...whiteTextFieldProps}
      />

      <Box className="relative mb-4">
        <TextField
          value={filmInput}
          onChange={(e) => setFilmInput(e.target.value)}
          placeholder="Search a film..."
          variant="outlined"
          fullWidth
          {...whiteTextFieldProps}
        />

        {searchResults.length > 0 && (
          <Box className="absolute z-10 w-full bg-[#1f1f1f] rounded-md mt-1 max-h-96 overflow-y-auto p-2 flex flex-col gap-2">
            {searchResults.map((movie) => (
              <button
                key={movie.id}
                onClick={() => handleAddFilmFromSearch(movie)}
                className="hover:scale-105 transition-transform text-left w-full"
              >
                <MoviesCard movie={movie} small={true} />
              </button>
            ))}
          </Box>
        )}
      </Box>

      <Button
        variant="contained"
        color="success"
        startIcon={<Plus size={16} />}
        onClick={handleAddFilm}
        className="mb-4"
      >
        Add a Film
      </Button>

      {films.length === 0 ? (
        <Typography className="text-center italic text-gray-400">
          Your list is empty.
        </Typography>
      ) : (
        <Box className="flex flex-wrap gap-3 mb-4">
          {films.map((film, idx) => (
            <Box key={idx} className="relative">
              <button
                onClick={() => setFilms((prev) => prev.filter((_, i) => i !== idx))}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  color: "#fff",
                  zIndex: 10,
                }}
              >
                <X size={14} />
              </button>
              <MoviesCard movie={film} small={true} />
            </Box>
          ))}
        </Box>
      )}

      <Box className="flex justify-end gap-4 mt-4">
        <Button variant="outlined" color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="success" onClick={handleSave} startIcon={<Save size={16} />}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default NewListForm;









