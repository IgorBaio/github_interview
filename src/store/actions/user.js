import {
    USER_GET_DATA,
    USER_GET_DATA_REPOS,
    USER_GET_DATA_STARRED,
    USER_GET_DATA_SUCCESS,
    USER_GET_DATA_REPOS_SUCCESS,
    USER_GET_DATA_STARRED_SUCCESS,
    USER_GET_DATA_STARRED_FAIL,
    USER_GET_DATA_REPOS_FAIL,
    USER_GET_DATA_FAIL
} from "./types";

export const getUser = (payload, resolve = null, reject = null) => ({
   type: USER_GET_DATA,
   payload,
   resolve,
   reject,
 });
 
 export const getUserSuccess = ({ payload }) => ({
   type: USER_GET_DATA_SUCCESS,
   payload,
 });
 export const getUserFail = () => ({
   type: USER_GET_DATA_FAIL,
 });

 export const getUserRepos = (payload, resolve = null, reject = null) => ({
   type: USER_GET_DATA_REPOS,
   payload,
   resolve,
   reject,
 });
 
 export const getUserReposSuccess = ({ payload }) => ({
   type: USER_GET_DATA_REPOS_SUCCESS,
   payload,
 });
 export const getUserReposFail = () => ({
   type: USER_GET_DATA_REPOS_FAIL,
 });

 export const getUserStarred = (payload, resolve = null, reject = null) => ({
   type: USER_GET_DATA_STARRED,
   payload,
   resolve,
   reject,
 });
 
 export const getUserStarredSuccess = ({ payload }) => ({
   type: USER_GET_DATA_STARRED_SUCCESS,
   payload,
 });
 
 export const getUserStarredFail = () => ({
   type: USER_GET_DATA_STARRED_FAIL,
 });

 