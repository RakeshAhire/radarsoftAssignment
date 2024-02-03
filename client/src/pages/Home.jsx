import { useEffect, useState } from "react";
import PopUpModal from "../components/PopUpModel";
import { Link } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../redux/action";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

const Home = () => {
  const [isLoading, user, blogs] = useSelector(
    (state) => [state.isLoading, state.user, state.blogs],
    shallowEqual
  );
  // console.log("blogs: ", blogs);
  const dispatch = useDispatch();
  const [showAddPostPopUp, setShowAddPostPopUp] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    const getBlogs = async () => {
      try {
        dispatch(getAllBlogs());
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
    // console.log("Form Data:", formData);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/blog/create`,
        formData,
        { withCredentials: true }
      );
      // console.log("response: ", response.data);
      dispatch(getAllBlogs());
      setFormData({
        title: "",
        description: "",
        category: "",
        image: "",
      });
      setShowAddPostPopUp(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleSort = async (e) => {
    const type = e.target.value;
    dispatch(getAllBlogs(type));
  };

  const handleAddPostPopUp = () => {
    setShowAddPostPopUp(!showAddPostPopUp);
  };

  const formatSimpleTime = (timestamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedTime = new Date(timestamp).toLocaleString("en-US", options);
    return formattedTime;
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <div className="w-full flex justify-end gap-8">
        <select onChange={handleSort} className="border p-2 ">
          <option value="">Sort</option>
          <option value="new">New Post First</option>
          <option value="old">old Post First</option>
        </select>
        <button
          className="px-2 border-none bg-teal-500 text-white cursor-pointer rounded-md"
          onClick={handleAddPostPopUp}
        >
          New Post
        </button>
        {showAddPostPopUp && (
          <PopUpModal handlePopUp={handleAddPostPopUp}>
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
                placeholder="Image"
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
          </PopUpModal>
        )}
      </div>
      <div className="flex flex-col gap-6 mb-8">
        {blogs.length > 0 ? (
          blogs.map((item, index) => (
            <div
              key={item._id}
              className={`flex ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } gap-5 mt-12 border-b-2`}
            >
              <img
                src={item.image}
                alt="PostedImage"
                className="flex-1 h-72 object-cover rounded-tr-xl rounded-bl-xl"
              />
              <div className={`flex-1 flex flex-col justify-between p-4`}>
                <div className="max-h-60 overflow-hidden">
                  <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
                  <p className="text-gray-600 text-lg">{item.description}</p>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <p className="text-gray-600 text-lg">
                      <span className="text-center  px-2">Category :</span>
                      {item.category}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="text-center  px-2">Posted Date :</span>
                      {formatSimpleTime(item.createdAt)}
                    </p>
                    <Link
                      to={`/post/${item._id}`}
                      className="bg-blue-500 text-white px-2 rounded hover:bg-blue-600 mt-1"
                    >
                      Read More...
                    </Link>
                  </div>
                  <div>
                    <img
                      src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="author"
                      className="rounded-full w-10 h-10"
                    />
                    <span className="text-gray-800">
                      {item.userID.userName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-4 my-8 border-b pb-3">
            <div className="w-full h-72 relative">
              <h2 className="text-2xl font-bold">No Post Available</h2>
              <p className="text-gray-600">Change Search input</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
