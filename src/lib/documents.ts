import axios from "axios";
import { DocumentType } from "@/type/documentType";
import { useAuthStore } from "@/store/auth/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 문서 목록 조회
export const getDocuments = async () => {
  const token = useAuthStore.getState().token;
  const res = await axios.get(`/api/documents`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// 문서 모든 버전 목록 조회
export const getDocumentById = async (id: string) => {
  const token = useAuthStore.getState().token;
  const res = await axios.get(`${API_URL}/api/v1/documents/${id}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// 신규 문서 등록
export const createDocument = async (fileInfo: {
  title: string;
  fileName: string;
  fileKey: string;
  fileType: string;
  fileSize: number;
}) => {
  const token = useAuthStore.getState().token;
  const res = await axios.post(`/api/documents/upload`, fileInfo, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// 새로운 버전 업로드
export const uploadDocument = async (id: string, fileInfo: DocumentType) => {
  const token = useAuthStore.getState().token;
  const res = await axios.post(
    `${API_URL}/api/v1/documents/upload/${id}`,
    { fileInfo },
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};

// 문서 삭제
export const deleteDocument = async (id: string) => {
  const token = useAuthStore.getState().token;
  const res = await axios.delete(`${API_URL}/api/v1/documents/${id}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
