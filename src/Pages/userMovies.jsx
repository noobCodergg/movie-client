import React, { useEffect, useState } from "react";
import { getAllMovie } from "@/Api/movieApi";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const UserMovies = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const res = await getAllMovie(search);
      setMovies(res.data || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search]);

  const handleNavigate = (id) => {
    navigate(`/movie-detail/${id}`);
  };

  return (
    <div className="p-20 w-full mx-auto bg-[#1E212A] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 text-white"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 pt-10">
        {movies.length === 0 ? (
          <p className="text-gray-500 col-span-full">No movies found.</p>
        ) : (
          movies.map((movie, index) => (
            <motion.div
              key={movie._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="relative h-64 cursor-pointer rounded-lg overflow-hidden group shadow-lg"
              onClick={() => handleNavigate(movie._id)}
              style={{
                backgroundImage: `url(${
                  movie.image
                    ? `http://localhost:8000/${movie.image.replace(/\\/g, "/")}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-200" />

              {/* Rating Top Right */}
              <p className="absolute top-1 right-2 text-black text-sm font-semibold bg-yellow-400 px-2 py-1 rounded">
                {movie.rating.toFixed(1)}/5
              </p>

              {/* Title Bottom Left */}
              <div className="absolute bottom-1 w-full text-center">
                <p className="text-white w-full text-sm font-medium bg-black/50 py-1 rounded">
                  {movie.title}
                </p>
                <p className="text-white text-xs italic px-2 py-1 rounded">
                  by {movie.author}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserMovies;
