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
