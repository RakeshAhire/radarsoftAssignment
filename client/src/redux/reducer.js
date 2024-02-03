import * as types from "./actionTypes";
import { getLocalStorage, setLocalStorage } from "../utils/setLocalStorage";

const initialState = {
  isLoading: false,
  user: getLocalStorage("user") || "",
  isError: false,
  blogs: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGIN_SUCCESS:
      setLocalStorage("user", payload);
      return {
        ...state,
        isLoading: false,
        user: payload,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case types.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: "",
      };
    case types.LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case types.GET_BLOG_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.GET_BLOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        blogs: payload,
      };

    case types.GET_BLOG_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        blog: [],
      };

    default:
      return state;
  }
};

export default reducer;
