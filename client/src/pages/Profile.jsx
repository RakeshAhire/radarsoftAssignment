import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBlogsByUser } from "../redux/action";
import axios from "axios";

const Profile = () => {
  const [isLoading, user, blogs] = useSelector(
    (state) => [state.isLoading, state.user, state.blogs],
    shallowEqual
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getBlogs = async () => {
      try {
        dispatch(getAllBlogsByUser());
      } catch (error) {}
    };
    getBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_API}/api/blog/delete/${id}`,
        { withCredentials: true }
      );
      alert(response.data.message);
      // console.log("response: ", response.data);
      dispatch(getAllBlogsByUser());
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/blog/create`,
        formData,
        { withCredentials: true }
      );
      // console.log("response: ", response.data);
      alert("Post Addded Successfully");
      dispatch(getAllBlogsByUser());
      setFormData({
        title: "",
        description: "",
        category: "",
        image: "",
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container mx-auto flex gap-10 items-start justify-center">
      <div className="flex-1">
        {isLoading ? (
          <LoadingSpinner />
        ) : blogs.length > 0 ? (
          blogs.map((item) => (
            <div
              className="flex flex-col gap-4 my-8 border-b pb-3"
              key={item._id}
            >
              <div className="w-full h-72 relative">
                <img
                  src={item.image}
                  alt="PostedImage"
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="flex justify-between items-end gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-800">
                    <span>Category : </span>
                    {item.category}
                  </p>
                </div>
                <div className="flex justify-between gap-4">
                  <Link to={`/post/edit/${item._id}`}>
                    <FaEdit className=" hover:text-green-500" />
                  </Link>
                  <FaTrash
                    onClick={() => handleDelete(item._id)}
                    className="cursor-pointer hover:text-red-500"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-4 my-8 border-b pb-3">
            <div className="w-full h-72 relative">
              <h2 className="text-2xl font-bold">No Post Added</h2>
              <p className="text-gray-600">This is exact layout you see for your post</p>
            </div>
            <div className="flex justify-between items-end gap-4">
              <div>
                <h2 className="text-2xl font-bold">You Title</h2>
                <p className="text-gray-600">Your Description</p>
                <p className="text-gray-800">
                  <span>Category : </span>
                  Your Category
                </p>
              </div>
              <div className="flex justify-between gap-4">
                <FaEdit className=" hover:text-green-500" />
                <FaTrash className="cursor-pointer hover:text-red-500" />
              </div>
            </div>
          </div>
        )}
      </div>
      <form
        className="sticky top-[10%] w-300px h-max-content mt-2 text-center flex flex-col gap-1"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
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
          <option value="">Category</option>
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
        <div className="mt-10 flex flex-col justify-start items-start">
          <div className="mt-10 flex items-center gap-5 justify-start">
            <p className="text-gray-800">Profile Photo :</p>
            <img
              src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="author"
              className="rounded-full w-10 h-10"
            />
          </div>
          <p className="text-gray-800">User Name: {user.userName}</p>
          <p className="text-gray-800">Total Post: {blogs.length}</p>
        </div>
      </form>
    </div>
  );
};

export default Profile;
