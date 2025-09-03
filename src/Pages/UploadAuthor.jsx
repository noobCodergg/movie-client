import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { uploadAuthor } from "@/Api/movieApi";

const UploadAuthor = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    start:"",
    bio: "",
    nationality: "",
    awards: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("dob", formData.dob);
      data.append("bio", formData.bio);
      data.append("start", formData.start);
      data.append("nationality", formData.nationality);
      data.append("awards", formData.awards);
      data.append("image", formData.image);

      const res = await uploadAuthor(data); // make sure your API expects FormData
      console.log(res);

      setMessage("Author uploaded successfully!");
      setFormData({
        name: "",
        dob: "",
        bio: "",
        start:"",
        nationality: "",
        awards: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      setMessage("Failed to upload author.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6  text-black">
      <h2 className="text-2xl font-bold mb-6">Upload Director</h2>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Director Name"
          required
        />
        <Input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
        />

        <Input
          type="date"
          name="start"
          value={formData.start}
          onChange={handleChange}
          placeholder="Years Active"
        />
        <Textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          placeholder="Short Biography"
        />
        <Input
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          placeholder="Nationality"
        />
        <Input
          type="text"
          name="awards"
          value={formData.awards}
          onChange={handleChange}
          placeholder="Awards (comma separated)"
        />
        <Input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          placeholder="Author Image"
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Author"}
        </Button>
      </form>
    </div>
  );
};

export default UploadAuthor;
