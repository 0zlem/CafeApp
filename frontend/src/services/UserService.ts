import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin`;

export type UserRole = "Admin" | "Mutfak" | "Garson";

export const updateUserRole = async (data:{userId:string; newRole:UserRole;}) => {
  const token = localStorage.getItem("token");

  const response =  await axios.put(`${API_URL}/users/role`,{
    UserId: data.userId,
    NewRole: data.newRole,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
};

export const getUsers = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_URL}/users`, { 
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.data;
};

