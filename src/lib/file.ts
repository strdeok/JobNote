import { useAuthStore } from "@/store/auth/authStore";
import axios from "axios";

export const uploadFile = async (
  file: File,
  fileInfo: { fileName: string; contentType: string; fileSize: number }
) => {
  const token = useAuthStore.getState().token;

  const presignedRes = await axios.post(`/api/v1/s3/presigned`, fileInfo, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const presignedUrl: string = presignedRes.data.data.presignedUrl;
  const fileKey: string = presignedRes.data.data.fileKey;

  const uploadRes = await axios.put(presignedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

  if (uploadRes.status !== 200) {
    throw new Error("S3 업로드 실패");
  }

  const fileUrl = presignedUrl.split("?")[0];

  return {
    fileUrl,
    fileKey,
  };
};
