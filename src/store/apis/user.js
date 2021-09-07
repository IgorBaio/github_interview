import webserver from "./webserver";

export const getUser = async (username, sso) => {
  try {
    const response = await webserver.get(`/${username.toLowerCase()}`);
    if (!response && !response?.data) {
      return false;
    }
    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUserRepos = async (username, sso) => {
  try {
    const response = await webserver.get(`/${username}/repos`);
    if (!response && !response?.data) {
      return false;
    }
    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUserStarred = async (username, sso) => {
  try {
    const response = await webserver.get(`/${username}/starred`);
    if (!response && !response?.data) {
      return false;
    }
    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

