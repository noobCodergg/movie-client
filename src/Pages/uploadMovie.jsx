import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { format } from "date-fns";
import { uploadMovie } from "../Api/movieApi";

const UploadMovie = () => {
  const [data, setData] = useState({
    title: "",
    image: null,
    featured: false,
    details: "",
    release_date: null,
    genre: [""],       // renamed from genres to genre
    rating: 0,
    author: "",
    synopsis: "",
    release_year: "",
    main_cast: [""],
    runtime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "release_date") {
        formData.append(key, data[key] ? data[key].toISOString() : "");
      } else if (Array.isArray(data[key])) {
        data[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await uploadMovie(formData);
      console.log("Upload successful", response);
      alert("Movie uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="Movie Title"
          required
        />

        <Input
          name="author"
          value={data.author}
          onChange={handleChange}
          placeholder="Author / Director"
          required
        />

        <Input
          name="release_year"
          value={data.release_year}
          onChange={handleChange}
          placeholder="Release Year"
          required
        />

        <Input
          name="runtime"
          value={data.runtime}
          onChange={handleChange}
          placeholder="Runtime (e.g., 2h 15min)"
          required
        />

        {/* Genres */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Genres</label>
          {data.genre.map((genreItem, index) => (
            <Input
              key={index}
              value={genreItem}
              onChange={(e) => {
                const newGenre = [...data.genre];
                newGenre[index] = e.target.value;
                setData((prev) => ({ ...prev, genre: newGenre }));
              }}
              placeholder={`Genre ${index + 1}`}
              required
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setData((prev) => ({ ...prev, genre: [...prev.genre, ""] }))
            }
            disabled={data.genre[data.genre.length - 1]?.trim() === ""}
          >
            ➕ Add Genre
          </Button>
        </div>

        {/* Main Cast */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Main Cast</label>
          {data.main_cast.map((actor, index) => (
            <Input
              key={index}
              value={actor}
              onChange={(e) => {
                const newCast = [...data.main_cast];
                newCast[index] = e.target.value;
                setData((prev) => ({ ...prev, main_cast: newCast }));
              }}
              placeholder={`Actor ${index + 1}`}
              required
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setData((prev) => ({
                ...prev,
                main_cast: [...prev.main_cast, ""],
              }))
            }
            disabled={data.main_cast[data.main_cast.length - 1]?.trim() === ""}
          >
            ➕ Add Actor
          </Button>
        </div>

        {/* Release Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              {data.release_date
                ? format(data.release_date, "PPP")
                : "Pick a release date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={data.release_date}
              onSelect={(date) =>
                setData((prev) => ({ ...prev, release_date: date }))
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Image Upload */}
        <Input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) =>
            setData((prev) => ({ ...prev, image: e.target.files[0] }))
          }
          required
        />

        {/* Details */}
        <textarea
          name="details"
          value={data.details}
          onChange={handleChange}
          placeholder="Movie details..."
          rows="4"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>

        {/* Synopsis */}
        <textarea
          name="synopsis"
          value={data.synopsis}
          onChange={handleChange}
          placeholder="Movie synopsis..."
          rows="3"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <Button type="submit">Upload Movie</Button>
      </form>
    </div>
  );
};

export default UploadMovie;
