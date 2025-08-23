import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 로그인 요청
export const login = async (email: string, password: string) => {
  const res = await axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true } 
  );
  return res; 
};

// 리프레시 토큰 요청
export const reissue = async () => {
  const res = await axios.post(
    `${API_URL}/api/v1/users/reissue`,
    {},
    { withCredentials: true } 
  );
  return res;
};
