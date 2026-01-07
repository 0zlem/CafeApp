import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

export interface KitchenOrder {
  id: string;
  tableName: string;      
  totalAmount: number;    
  status: number;        
  items: KitchenOrderItem[];
}

export interface KitchenOrderItem {
  productName: string;
  quantity: number;
  price: number;
}


export const createOrder = async (data: {
  tableId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}) => {
  try {
    const response = await axios.post(`${API_URL}/create`, data);
    return response.data.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${orderId}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

export const getActiveOrdersByTable = async (tableId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/active/${tableId}`
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

export const getActiveOrders = async ()=> {
    try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/active`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
}

export const setOrderPreparing = async (orderId: string) => {
  try {
  const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/preparing/${orderId}`,
      {},
     {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

export const setOrderReady = async (orderId: string) => {
  try {
  const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/ready/${orderId}`,
      {},
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

export const setOrderServed = async (orderId: string) => {
  try {
  const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/served/${orderId}`,
      {},
     {
      headers: {
        Authorization: `Bearer ${token}`,
      },
     }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

export const setOrderPaid = async (
  orderId: string,
  paymentType: number
) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/paid/${orderId}`,
    {
      paymentType,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

