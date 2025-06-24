import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../utils/auth";
import { Box, Typography } from "@mui/material";

interface MoviesList {
  _id: string;
  name: string;
  description?: string;
  tags?: string[];
  images: string[];
  titles: string[];
  createdAt: string;
  updatedAt: string;
}

const List: React.FC = () => {
  const [lists, setLists] = useState<MoviesList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = getAuthToken();
        if (!token) {
          setError("No auth token found. Please log in.");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/movies/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setLists(response.data.data || []);
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "Error fetching lists"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, []);

  if (loading) {
    return (
      <Box className="text-center p-8">
        <Typography variant="h6">Loading lists…</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="text-center p-8 text-red-500">
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  if (lists.length === 0) {
    return (
      <Box className="text-center p-8">
        <Typography variant="h6">You haven't created any lists yet.</Typography>
      </Box>
    );
  }

  return (
    <Box className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {lists.map((list) => (
        <Box
          key={list._id}
          className="bg-[#1f1f1f] p-4 rounded-lg shadow hover:scale-105 transition-transform"
        >
          {/* Thumbnails */}
          <Box className="flex mb-2 gap-1 overflow-hidden">
            {list.images.slice(0, 4).map((imgUrl, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w200${imgUrl}`}
                alt={list.titles[index] || list.name}
                className="w-1/4 h-24 object-cover rounded"
              />
            ))}
          </Box>

          {/* Title & Info */}
          <Typography variant="h5" className="font-bold text-white mb-1">
            {list.name}
          </Typography>
          <Typography variant="body2" className="text-gray-400 mb-2">
            {list.titles.length} movies • {new Date(list.createdAt).toDateString()}
          </Typography>
          {list.description && (
            <Typography variant="body2" className="text-white mb-2">
              {list.description}
            </Typography>
          )}

          {/* Tags */}
          {list.tags && list.tags.length > 0 && (
            <Box className="flex flex-wrap gap-1">
              {list.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-700 text-white text-xs px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default List;
