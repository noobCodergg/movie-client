import { getMovieById, postFav, updateRating } from '@/Api/movieApi';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { UserContext } from '@/Context/UserContext';
import {Link} from 'react-router-dom'

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const { userId } = useContext(UserContext);
  const [isFavourite, setIsFavourite] = useState(false);

  const fetchMovie = async () => {
    try {
      const res = await getMovieById(id, userId);
      console.log(res);
      setMovie(res.data.movie);
      setIsFavourite(res.data.isFavourite);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const openRatingModal = () => {
    setShowRatingModal(true);
  };

  const closeRatingModal = () => {
    setShowRatingModal(false);
  };

  const updateMovieRating = async (movieId, rating) => {
    try {
      await updateRating(movieId, rating);
      fetchMovie();
      console.log('Rating updated successfully');
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    updateMovieRating(movie._id, rating);
    closeRatingModal();
  };

  const handlePost = async (userId, id) => {
    try {
      await postFav(userId, id);
      setIsFavourite(true); // update state immediately
    } catch (error) {
      console.error('Error adding to favourites:', error);
    }
  };

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
            <Link to={`/author-details/${movie.author}`} className="flex items-center space-x-1">
  <strong>Director:</strong>
  <span className="text-blue-600">{movie.author}</span>
</Link>
            <p><strong>Release:</strong> {movie.release_year}</p>
            <p><strong>Country:</strong> United States</p>
            <p><strong>🌟 Rating:</strong> {movie.rating.toFixed(1)}/5</p>
          </div>
          
          {/* Rate Button */}
          <div className="mt-4">
            <Button variant="default" onClick={openRatingModal} className='border'>Rate</Button>
          </div>

          {/* Add to Favourites Button */}
          <div className="mt-4">
            <Button 
              variant="default" 
              onClick={() => handlePost(userId, id)} 
              className={`flex items-center gap-2 ${isFavourite ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500'}`}
              disabled={isFavourite}
            >
              <FaHeart className={`text-lg ${isFavourite ? 'text-red-500' : 'text-gray-200'}`} />
              {isFavourite ? 'Added to Favourites' : 'Add to Favourites'}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
          <div className="bg-zinc-800 p-6 rounded-lg text-white w-96">
            <h3 className="text-xl font-bold mb-4">Rate the Movie</h3>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant="outline"
                  className={`w-12 h-12 rounded-full ${userRating === rating ? 'bg-yellow-400' : 'bg-gray-600'}`}
                  onClick={() => handleRating(rating)}
                >
                  {rating}
                </Button>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="default" onClick={closeRatingModal}>Close</Button>
            </div>
          </div>
        </div>
      )}

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
