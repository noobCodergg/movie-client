import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuthorDetails } from "@/Api/movieApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AuthorDetails = () => {
  const { name } = useParams();
  const [author, setAuthor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const response = await getAuthorDetails(name);
      setAuthor(response.data.author);
      setMovies(response.data.movies);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [name]);

  if (loading)
    return <div className="text-white p-6 text-center text-xl bg-[#12131A] min-h-screen">Loading...</div>;
  if (!author)
    return <div className="text-white p-6 text-center text-xl bg-[#12131A] min-h-screen">Author not found</div>;

  const yearsActive = new Date().getFullYear() - new Date(author.start).getFullYear();

  return (
    <div className="p-6 w-full mx-auto text-white space-y-12 bg-[#12131A] min-h-screen">

      {/* Author Info */}
      <div className="flex flex-col md:flex-row items-center bg-[#1A1B23] shadow-lg rounded-2xl overflow-hidden transition hover:shadow-2xl">
        {/* Left: Image */}
        <div className="w-40 h-40 md:w-60 md:h-60 flex-shrink-0 m-6">
          <img
            src={`http://localhost:8000/${author.image.replace(/\\/g, "/")}`}
            alt={author.name}
            className="w-full h-full object-cover rounded-full border-4 border-cyan-500 shadow-lg"
          />
        </div>

        {/* Right: Info */}
        <div className="flex-1 p-6 space-y-4 md:space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight">{author.name}</h1>
          <p className="italic text-gray-400 text-lg">{author.bio}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 text-sm md:text-base">
            <p><span className="font-semibold">Date of Birth:</span> {new Date(author.dob).toLocaleDateString()}</p>
            <p><span className="font-semibold">Nationality:</span> {author.nationality}</p>
            <p><span className="font-semibold">Awards:</span> {author.awards.join(", ")}</p>
            <p><span className="font-semibold">Years Active:</span> {yearsActive} {yearsActive > 1 ? "years" : "year"}</p>
          </div>
        </div>
      </div>

      {/* Movies Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Movies by {author.name}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Card
                key={movie._id}
                className="bg-[#1A1B23] border border-gray-700 rounded-xl overflow-hidden transform transition hover:scale-105 hover:shadow-lg"
              >
                <img
                  src={`http://localhost:8000/${movie.image.replace(/\\/g, "/")}`}
                  alt={movie.title}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-3 flex flex-col space-y-1">
                  <h3 className="text-md font-semibold text-white truncate">{movie.title}</h3>
                
                  
                  <Button
                    onClick={() => window.location.href = `/movie-detail/${movie._id}`}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-sm mt-2"
                  >
                    Watch
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-400">No movies found for this author.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
