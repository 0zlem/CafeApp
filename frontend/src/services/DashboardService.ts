import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin`;

export interface SalesOverview {
  date: string; 
  totalOrders: number;
  totalRevenue: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  quantitySold: number;
}

export interface StockOverview {
  productId: string;
  productName: string;
  stock: number;
  isLowStock: boolean;
}

export const getSalesOverview = async (): Promise<SalesOverview[]> => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/dashboard/sales`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } );
  return response.data.data;
};

export const getTopProducts = async (): Promise<TopProduct[]> => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/dashboard/topProducts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return response.data.data;
};

export const getStockOverview = async (): Promise<StockOverview[]> => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/dashboard/stock`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return response.data.data;
};