import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllMovie,deleteMovie,updateMovie } from "@/Api/movieApi";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  

  useEffect(() => {
    fetchMovies();
  }, [search]);

  const fetchMovies = async () => {
    try {
      const res = await getAllMovie(search);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete =async(id)=>{
    try{
        await deleteMovie(id)
        fetchMovies();
    }catch(err){
        console.log(err)
    }
  }


  const handleUpdate = async(id,status)=>{
    console.log(id,status)
    try{
        await updateMovie(id,!status)
        fetchMovies()
    }catch(error){
        console.log(error)
    }
  }
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold">All Movies</h2>
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64"
        />
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Title</TableHead>
              <TableHead className="text-left">Genre</TableHead>
              <TableHead className="text-left">Release Date</TableHead>
              <TableHead className="text-center">Featured</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {movies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No movies found.
                </TableCell>
              </TableRow>
            ) : (
              movies.map((movie) => (
                <TableRow key={movie._id}>
                  <TableCell className="text-left">{movie.title}</TableCell>
                  <TableCell className="text-left">{movie.genre}</TableCell>
                  <TableCell className="text-left">
                    {movie.release_date?.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={
                        movie.featured
                          ? "text-green-600 font-medium"
                          : "text-gray-500"
                      }
                    >
                      {movie.featured ? "Yes" : "No"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right pr-6 space-x-2">
                    <Button size="sm" variant="outline" onClick={()=>handleUpdate(movie._id,movie.featured)}>
                      {movie.featured ? "Unfeature" : "Feature"}
                    </Button>
                    <Button size="sm" variant="destructive" onClick = {()=>handleDelete(movie._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllMovies;
