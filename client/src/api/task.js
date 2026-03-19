import axiosClient from "../utils/axiosClient";


export const createTask = async ({ formData, accessToken }) => {
  return await axiosClient.post("/task/create", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getTasks = async (accessToken) => {
  const response = await axiosClient.get("/task/get", {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return response.data; 
};


export const deleteTask = async ({ id, accessToken }) => {
  const response = await axiosClient.delete(`/task/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};


export const getSingleTask = async ({ id, accessToken }) => {
  const response = await axiosClient.get(`/task/single/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};


export const updateTask = async ({ id, taskData, accessToken }) => {
  const response = await axiosClient.patch(`/task/update/${id}`, taskData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};