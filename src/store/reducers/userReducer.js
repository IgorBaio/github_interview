import {
  USER_GET_DATA_SUCCESS,
  USER_GET_DATA,
  USER_GET_DATA_STARRED_SUCCESS,
  USER_GET_DATA_REPOS,
  USER_GET_DATA_REPOS_SUCCESS,
  USER_GET_DATA_STARRED,
  USER_GET_DATA_FAIL,
  USER_GET_DATA_REPOS_FAIL,
  USER_GET_DATA_STARRED_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  repos: null,
  starred: null,
  loading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_GET_DATA:
      return {
        ...state,
        loading: true,
      };

    case USER_GET_DATA_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case USER_GET_DATA_REPOS:
      return {
        ...state,
        loading: true,
      };

    case USER_GET_DATA_REPOS_SUCCESS:
      return {
        ...state,
        repos: action.payload,
        starred: null,
        loading: false,
      };
    case USER_GET_DATA_STARRED:
      return {
        ...state,
        loading: true,
      };

    case USER_GET_DATA_STARRED_SUCCESS:
      return {
        ...state,
        starred: action.payload,
        repos: null,
        loading: false,
      };
    case USER_GET_DATA_FAIL:
    case USER_GET_DATA_REPOS_FAIL:
    case USER_GET_DATA_STARRED_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
