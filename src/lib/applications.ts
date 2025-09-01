import axios from "axios";
import { useAuthStore } from "@/store/auth/authStore";

export const uploadApplications = async (applicationForm: object) => {
  const accessToken = useAuthStore.getState().token;

  try {
    const res = await axios.post("/api/applications", applicationForm, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
