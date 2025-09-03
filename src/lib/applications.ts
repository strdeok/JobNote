import axios from "axios";
import { useAuthStore } from "@/store/auth/authStore";

// 지원서 업로드
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

// 지원서 목록 조회
export const fetchAllApplications = async () => {
  const accessToken = useAuthStore.getState().token;

  try {
    const res = await axios.get("/api/applications", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

// 단일 조회
export const fetchApplication = async (applicationId: number) => {
  const accessToken = useAuthStore.getState().token;

  try {
    const res = await axios.get(`/api/applications/${applicationId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

// 지원서 수정
export const updateApplication = async ({
  changedApplication,
  applicationId,
}: {
  changedApplication: object;
  applicationId: number;
}) => {
  const accessToken = useAuthStore.getState().token;

  try {
    const res = await axios.put(
      `/api/applications/${applicationId}`,
      changedApplication,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 지원서 삭제
export const deleteApplication = async (applicationId: number) => {
  const accessToken = useAuthStore.getState().token;

  try {
    const res = await axios.delete(`/api/applications/${applicationId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};