import axios from "axios";
import { useAuthStore } from "@/store/auth/authStore";

export const uploadApplications = async (applicationForm: object) => {
  const { token: accessToken } = useAuthStore();
  try {
    const res = await axios.post("/api/applications", applicationForm, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err: any) {
    console.error("API 업로드 실패:", err.response || err);
    throw err;
  }
};
