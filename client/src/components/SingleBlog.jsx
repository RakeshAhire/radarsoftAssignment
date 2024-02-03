import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "../redux/action";
import { useDispatch } from "react-redux";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        let res = await dispatch(getSingleBlog(id));
        setBlog(res);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getBlogs();
  }, []);

  return (
    <div className=" h-[100vh] shadow-md">
      <div className="flex flex-col justify-center items-center gap-10 m-auto">
        <div className="w-3/4 h-72 ">
          <img
            src={blog?.image}
            alt="PostedImage"
            className="w-full h-full object-fill"
          />
        </div>
        <h1 className="text-4xl font-bold">{blog?.title}</h1>
        <p className="text-gray-600">{blog?.description}</p>
        <div className="flex justify-center gap-4 items-center">
          <p>Author :</p>
          <span className="text-gray-800">{blog?.userID.userName}</span>
          <img
            src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="author"
            className="rounded-full w-10 h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
