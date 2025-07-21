import { getMovieById } from '@/Api/movieApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovie = async () => {
    try {
      const res = await getMovieById(id);
      setMovie(res.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!movie) {
    return <p className="text-center mt-10 text-gray-500">Movie not found.</p>;
  }

  return (
    <div className="w-full h-full bg-zinc-900 text-white p-4 md:p-8">
      {/* Movie Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col md:flex-row bg-zinc-900 rounded-lg overflow-hidden shadow-lg"
      >
        {/* Poster */}
        <div>
          <img
            src={`http://localhost:8000/${movie.image}`}
            alt={movie.title}
            className="w-64 h-84 object-cover"
          />
        </div>

        {/* Info */}
        <div className="md:w-2/3 p-6 space-y-6">
          <h2 className="text-4xl font-extrabold">{movie.title}</h2>
          <p className="text-base italic text-gray-300">{movie.synopsis}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 mt-6 text-base">
            <p><strong>Genre:</strong> {movie.genre?.join(', ')}</p>
            <p><strong>Duration:</strong> {movie.runtime} </p>
            <p><strong>Main Cast:</strong> {movie.main_cast?.join(', ')}</p>
            <p><strong>Quality:</strong> <span className="bg-yellow-400 text-black px-2 rounded">HD</span></p>
            <p><strong>Director:</strong> {movie.author}</p>
            <p><strong>Release:</strong> {movie.release_year}</p>
            <p><strong>Country:</strong> United States</p>
            <p><strong>🌟 Rating:</strong> {movie.rating}/5</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full h-screen mt-10"
      >
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="bg-zinc-800 text-white flex gap-2 text-base">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="synopsis">Synopsis</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4 text-base bg-zinc-900 p-4 rounded">
            <p>{movie.details}</p>
          </TabsContent>

          <TabsContent value="synopsis" className="mt-4 text-base bg-zinc-900 p-4 rounded">
            <p>{movie.synopsis}</p>
          </TabsContent>

          <TabsContent value="comments" className="mt-4 text-base bg-zinc-900 p-4 rounded">
            <p>No comments yet.</p>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Details;
