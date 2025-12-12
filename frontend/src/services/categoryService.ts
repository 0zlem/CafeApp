import axios from "axios";

const CATEGORY_URL = "http://localhost:5134/categories";

export const getCategories = async () => {
  const res = await axios.get(CATEGORY_URL);
  return res.data.data;
};

export const getCategoryById = async (id: string) => {
  const response = await axios.get(`${CATEGORY_URL}/${id}`);
  return response.data.data;
};

export const addCategory = async (data: { name: string }) => {
  const token = localStorage.getItem("token");

  return await axios.post(
    `${CATEGORY_URL}/create`,
    { Name: data.name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateCategory = async (data: { id: string; name: string }) => {
  const token = localStorage.getItem("token");

  return await axios.put(
    `${CATEGORY_URL}/update`,
    {
      Id: data.id,
      Name: data.name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};



