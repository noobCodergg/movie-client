import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { logOut } from '@/Api/authApi';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { role, setRole } = useContext(UserContext);

  if (!role) {
    setRole(localStorage.getItem('role'));
  }

  const navigate = useNavigate();

 const handleLogout = async () => {
  try {
    await logOut();
    setRole(null);
    localStorage.removeItem('role');
    navigate('/login', { replace: true }); 
  } catch (error) {
    console.log('Logout failed:', error);
  }
};


  return (
    <nav className="bg-[#030609] py-4 px-6 md:px-12 flex items-center justify-between shadow-md">
      {/* Left: Logo */}
      <Link to='/'><div className="text-2xl font-bold text-yellow-600">Movie Mania</div></Link>

      {/* Middle: Links */}
      <div className="flex-grow flex justify-center space-x-4 md:space-x-6">
       

        {role === 'admin' && (
          <>
            <Link
              to="/upload"
              className="text-white hover:text-blue-600 font-semibold transition-colors duration-300"
            >
              Upload Movie
            </Link>
            <Link
              to="/admin-movie"
              className="text-white hover:text-blue-600 font-semibold transition-colors duration-300"
            >
              All Movies
            </Link>

            <Link
              to="/upload-author"
              className="text-white hover:text-blue-600 font-semibold transition-colors duration-300"
            >
              Upload Director
            </Link>
          </>
        )}

        {role === 'user' && (
          <Link
            to="/all-movie"
            className="text-white hover:text-blue-600 font-semibold transition-colors duration-300"
          >
            Browse Movies
          </Link>
          
        )}
        {role === 'user' && (
          <Link
            to="/favourites"
            className="text-white hover:text-red-500 transition-colors duration-300"
          >
           Watch List
          </Link>
        )}

      </div>

      {/* Right: Favourites icon + Button */}
      <div className="flex items-center space-x-4">
       

        {role ? (
          <Button
            onClick={handleLogout}
            className="bg-transparent text-white font-semibold px-4 py-2 rounded-md"
          >
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button className="text-white font-semibold px-4 py-2 rounded-md">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
