import Registration from "./Pages/registration";
import Otp from "./Pages/otp";
import Login from "./Pages/login"; // fix import: use your custom Login component
import PublicRoute from "./Routes/publicRoute";
import { Route, Routes } from "react-router-dom";
import UserProvider from "./Context/UserContext";
import ProtectedRoute from "./Routes/protectedRoute";

import Unauthorized from "./Pages/Unauthorized";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import UploadMovie from "./Pages/uploadMovie";
import AllMovies from "./Pages/AllMovies";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserMovies from "./Pages/userMovies";
import Details from "./Pages/details";
import Favourites from "./Pages/Favourites";
import UploadAuthor from "./Pages/UploadAuthor";
import AuthorDetails from "./Pages/AuthorDetails";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route
          path="/registration"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />
        <Route path="/otp" element={<Otp />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />

        <Route
          path="/upload"
          element={
            <ProtectedRoute role={["admin"]}>
              <UploadMovie />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-movie"
          element={
            <ProtectedRoute role={["admin"]}>
              <AllMovies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/all-movie"
          element={
            <ProtectedRoute role={["user","admin"]}>
              <UserMovies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movie-detail/:id"
          element={
            <ProtectedRoute role={["user","admin"]}>
              <Details />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favourites"
          element={
            <ProtectedRoute role={["user","admin"]}>
              <Favourites/>
            </ProtectedRoute>
          }
        />

         <Route
          path="/upload-author"
          element={
            <ProtectedRoute role={["admin"]}>
              <UploadAuthor/>
            </ProtectedRoute>
          }
        />

          <Route
          path="/author-details/:name"
          element={
            <ProtectedRoute role={["user","admin"]}>
              <AuthorDetails/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
