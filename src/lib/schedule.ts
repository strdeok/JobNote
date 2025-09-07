import { useAuthStore } from "@/store/auth/authStore";
import axios from "axios";

export const fetchAllSchedules = async (startDate: string, endDate: string) => {
  const accessToken = useAuthStore.getState().token;

  try {
    const res = await axios.get("/api/schedule", {
      params: {
        startDate,
        endDate,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
