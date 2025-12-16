import axios from "axios";

const API_URL = "http://localhost:5134/tables";


export const createTable = async (data: { name: string }) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/create`,
    data, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateTable = async (data: {
  id: string;
  name: string;
}) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/update`,
    {
      id: data.id,
      name: data.name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const deleteTable = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/delete/${id}`,
   {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const activateTable = async (tableId: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/activate/${tableId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getTables = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}`,
   {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};


export const getTableById = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/${id}`,
   {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};