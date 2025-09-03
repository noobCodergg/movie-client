import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/movie", 
    withCredentials: true,
  });

export const uploadMovie = (formData) =>
  API.post("/upload-movie", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });



export const getAllMovie = ( search = '') =>
  API.get('/get-all-movie', {
    params: { search },
  });

  export const deleteMovie = (id)=>API.delete(`/delete-movie/${id}`)
  export const updateMovie = (id,status) =>API.put(`/update-movie/${id}`,{status})
  export const getMovieById = (id,userId) =>API.get(`/get-movie-by-id/${id}/${userId}`)
  export const updateRating = (movieId,rating)=>API.put(`/update-rating/${movieId}`,{rating})
  export const postFav = (userId,movieId) =>API.post('/post-fav',{userId,movieId})
  export const getFav = (userId) =>API.get(`/get-favourites/${userId}`)
  export const delteFav = (userId,movieId) => API.delete(`/delete-fav/${userId}/${movieId}`)

  export const uploadAuthor = (formData) =>
  API.post("/upload-author", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });


  export const getAuthorDetails = (name) =>API.get(`/get-author-detail/${name}`)