import { Link } from "react-router-dom";
import { clearLocalStorage } from "../utils/setLocalStorage";
import { logoutRequest, logoutSuccess, searchAllBlogs } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 3,
    title: "Profile",
    url: "/profile",
  },
];

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  let id;
  const signOut = () => {
    alert("Logout Successfully");
    dispatch(logoutRequest());
    clearLocalStorage("user");
    dispatch(logoutSuccess());
  };

  const handleSearchBlog = (e) => {
    const text = e.target.value;
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      dispatch(searchAllBlogs(text));
    }, 1000);
  };

  return (
    <div
      className="container h-20 w-full flex justify-between items-center 
                 backdrop-blur-sm sticky top-0 z-20 transition-all duration-1500"
    >
      <Link to="/" className="font-bold text-2xl">
        Daily Blog
      </Link>
      <input
        className="border text-center border-gray-400 outline-blue-500 cursor-pointer rounded-md"
        onChange={handleSearchBlog}
        placeholder="Search Post"
      />
      <div className="flex items-center gap-4">
        {/* <DarkModeToggle /> */}
        {links.map((element) => (
          <Link className="text-base" key={element.id} to={element.url}>
            {element.title}
          </Link>
        ))}
        {user && (
          <button
            className="px-2 border-none bg-blue-500 text-white cursor-pointer rounded-md"
            onClick={signOut}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
