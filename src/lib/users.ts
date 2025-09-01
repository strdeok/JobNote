import { useAuthStore } from "@/store/auth/authStore";
import axios from "axios";

export const setUserAvatar = async (avatarUrl: string) => {
  const token = useAuthStore.getState().token;
  try {
    const res = await axios.patch(
      "/api/users/avatar",
      {
        avatarUrl,
      },
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const setNickName = async (nickname: string) => {
  const token = useAuthStore.getState().token;
  try {
    const res = await axios.patch(
      "/api/users/nickname",
      {
        nickname,
      },
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (newPassword: string) => {
  const token = useAuthStore.getState().token;
  try {
    const res = await axios.patch(
      "/api/users/reset-password",
      {
        newPassword,
      },
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const withdraw = async () => {
  const token = useAuthStore.getState().token;
  try {
    const res = await axios.delete("/api/auth/withdraw", {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
