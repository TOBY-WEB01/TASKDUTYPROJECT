import axiosClient from "../utils/axiosClient";



export const registerUser = async (formData) => {
  return await axiosClient.post("/user/create", formData);
};

export const loginUser = async (formData) => {
  return await axiosClient.post("/user/login", formData);
};

export const refreshAccessToken = async () => {
  return await axiosClient.post(
    "/user/refresh-token",
    {},
    {
      withCredentials: true, //ensure cookies is sent along with request
    }
  );
};

export const logoutUser = async (accessToken) => {
  return await axiosClient.post(
    "/user/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    {
      withCredentials: true,
    }
  );
};

export const getAuthUser = async (accessToken) => {
  return await axiosClient.get("/user/get", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};