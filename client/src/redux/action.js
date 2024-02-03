import axios from "axios";
import * as types from "./actionTypes";

const loginRequest = () => {
  return {
    type: types.LOGIN_REQUEST,
  };
};

const loginSuccess = (payload) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
};

const loginFailure = () => {
  return {
    type: types.LOGIN_FAILURE,
  };
};
const logoutRequest = () => {
  return {
    type: types.LOGOUT_REQUEST,
  };
};

const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS,
  };
};

const logoutFailure = () => {
  return {
    type: types.LOGOUT_FAILURE,
  };
};

const blogRequest = () => {
  return {
    type: types.GET_BLOG_REQUEST,
  };
};

const blogSuccess = (payload) => {
  return {
    type: types.GET_BLOG_SUCCESS,
    payload,
  };
};

const blogFailure = () => {
  return {
    type: types.GET_BLOG_FAILURE,
  };
};

const getAllBlogsByUser = () => async (dispatch) => {
  try {
    dispatch(blogRequest());
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/api/blog/getall/user`,
      {
        withCredentials: true,
      }
    );
    // console.log("response.data: ", response.data);
    dispatch(blogSuccess(response.data));
  } catch (error) {
    console.log("error: ", error);
    dispatch(blogFailure());
  }
};

const getSingleBlog = (id) => async (dispatch) => {
  try {
    dispatch(blogRequest());
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/api/blog/getsingle/${id}`,
      {
        withCredentials: true,
      }
    );
    // console.log("response.data: ", response.data);
    dispatch(blogSuccess(response.data));
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    dispatch(blogFailure());
  }
};

const getAllBlogs =
  (type = "") =>
  async (dispatch) => {
    // console.log('type: ', type);
    try {
      dispatch(blogRequest());
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/api/blog/getall/?sort=${type}`,
        {
          withCredentials: true,
        }
      );
      // console.log("response.data: ", response.data);
      dispatch(blogSuccess(response.data));
    } catch (error) {
      console.log("error: ", error);
      dispatch(blogFailure());
    }
  };

const searchAllBlogs = (text) => async (dispatch) => {
  try {
    dispatch(blogRequest());
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/api/blog/search/?text=${text}`,
      {
        withCredentials: true,
      }
    );
    //   console.log("response.data: ", response.data);
    dispatch(blogSuccess(response.data));
  } catch (error) {
    console.log("error: ", error);
    dispatch(blogFailure());
  }
};

const userLogin = (payload) => async (dispatch) => {
  const { userName, password } = payload;
  try {
    dispatch(loginRequest());
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/auth/login`,
      { userName, password }
    );
    dispatch(loginSuccess(response.data.user));
    return response;
  } catch (error) {
    alert(error);
    dispatch(loginFailure());
  }
};

export {
  loginRequest,
  loginSuccess,
  loginFailure,
  userLogin,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  blogRequest,
  blogSuccess,
  blogFailure,
  getAllBlogs,
  getAllBlogsByUser,
  getSingleBlog,
  searchAllBlogs,
};
