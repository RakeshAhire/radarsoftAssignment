import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleBlog } from "../redux/action";
import { useDispatch } from "react-redux";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        let res = await dispatch(getSingleBlog(id));
        setFormData(res);
      } catch (error) {}
    };
    getBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = formData;
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_API}/api/blog/update/${id}`,
        payload,
        {
          withCredentials: true,
        }
      );
      // console.log("response.data: ", response.data);
      navigate(-1);
      alert("Updated Successfuly");
    } catch (error) {
      console.log("error: ", error);
    }
    setFormData({
      title: "",
      description: "",
      category: "",
      image: "",
    })
  };

  return (
    <div className="w-3/5 m-auto">
      <form
        className="sticky top-[10%] w-300px h-max-content mt-2 text-center flex flex-col gap-1"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 mb-4"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <select
          className="w-full border p-2 mb-4"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value={formData.category}>{formData.category || ""}</option>
          <option value="food">Food</option>
          <option value="education">Education</option>
          <option value="business">Business</option>
          <option value="politics">Politics</option>
          <option value="sports">Sports</option>
          <option value="travel">Travel</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Add Image Address"
          className="w-full border p-2 mb-4"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 mb-4 resize-none textArea"
          cols="30"
          rows="5"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          type="submit"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
