import React, { useContext, useEffect, useState } from "react";
import { getAllMovie } from "@/Api/movieApi";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserContext } from "@/Context/UserContext";

const Home = () => {
 
  const [movies, setMovies] = useState([]);
 const { role } = useContext(UserContext)

 const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      navigate("/login", { replace: true });
    }
  }, [role, navigate]);

  const fetchMovies = async () => {
    try {
      const response = await getAllMovie();
      setMovies(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => movie.featured);

  // Custom Arrow Components
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-4 top-1/2 z-30 transform -translate-y-1/2 cursor-pointer bg-black bg-opacity-40 hover:bg-opacity-70 p-2 rounded-full"
      onClick={onClick}
    >
      <ChevronRight className="text-white w-6 h-6" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-4 top-1/2 z-30 transform -translate-y-1/2 cursor-pointer bg-black bg-opacity-40 hover:bg-opacity-70 p-2 rounded-full"
      onClick={onClick}
    >
      <ChevronLeft className="text-white w-6 h-6" />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full h-screen overflow-hidden text-white bg-black relative">
      <Slider {...settings}>
        {filteredMovies.map((movie) => (
          <div key={movie._id} className="relative w-full h-screen overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
              style={{
                backgroundImage: `url(http://localhost:8000/${movie.image.replace(/\\/g, "/")})`,
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

            {/* Content */}
            <div className="absolute bottom-20 left-6 z-20 max-w-xl px-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h2>
              <div className="text-yellow-400 font-semibold mb-2">
                HD - {movie.runtime}
              </div>
              <div className="text-sm mb-2">
                {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}
              </div>
              <p className="text-gray-200 mb-4">
                {movie.synopsis?.slice(0, 160)}...
              </p>
              <button
                onClick={() => navigate(`/movie-detail/${movie._id}`)}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded"
              >
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
