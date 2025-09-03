import React, { useContext, useEffect, useState } from "react";
import { delteFav, getFav, } from "@/Api/movieApi"; 
import { UserContext } from "@/Context/UserContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Favourites = () => {
  const { userId } = useContext(UserContext);
  const [favs, setFavs] = useState([]);

  const fetchFav = async () => {
    try {
      const response = await getFav(userId);
      setFavs(response.data.favourites); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (movieId) => {
     try{
        await delteFav(userId,movieId)
        fetchFav()
     }catch(error){
        console.log(error)
     }
  };

  useEffect(() => {
    fetchFav();
  }, []);

  return (
    <div className="p-6 bg-[#1E212A] h-screen">
      <h1 className="text-xl font-semibold mb-4 text-white">Favourites</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Movie Name</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Release Year</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-white'>
          {favs.length > 0 ? (
            favs.map((fav) => (
              <TableRow key={fav._id}>
                {/* Image */}
                <TableCell>
                  <img
                    src={`http://localhost:8000/${fav.image}`}
                    alt={fav.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                </TableCell>

                {/* Movie Info */}
                <TableCell>{fav.title}</TableCell>
                <TableCell>{fav.author}</TableCell>
                <TableCell>{fav.release_year}</TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(fav._id)}
                  >
                    <Trash2 className="h-12 w-12 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No favourites found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Favourites;
