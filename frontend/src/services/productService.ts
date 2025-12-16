import axios from "axios"

const API_URL = "http://localhost:5134/products"; 

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.data || error.message;
    }
    throw error;
  }
};

export const getProductsByCategory = async (categoryId: string) => {
  try {
    const response = await axios.get(`${API_URL}/category/${categoryId}`);
    return response.data.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

export const addProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl?: string;
  isAvailable: boolean;
}) => {
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

export const updateProduct = async (data: {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl?: string;
  isAvailable: boolean;
}) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/update`,
    {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      categoryId: data.categoryId,
      imageUrl: data.imageUrl,
      isAvailable: data.isAvailable,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const deleteProduct = async (id: string) => {
  const token = localStorage.getItem("token");

  return await axios.delete(`${API_URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};