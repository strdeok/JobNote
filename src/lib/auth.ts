import { useAuthStore } from "@/store/auth/authStore";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 로그인 요청
export const login = async (email: string, password: string) => {
  const res = await axios.post("/api/auth/login", { email, password });
  const token = res.headers?.authorization;

  if (token) {
    useAuthStore.getState().setToken(token);
  }
  return res;
};

// 리프레시 토큰 요청
export const reissue = async () => {
  const res = await axios.post(`/api/v1/users/reissue`, null, {
    withCredentials: true,
  });

  const accessToken = res.headers?.authorization;

  if (accessToken) {
    useAuthStore.getState().setToken(accessToken);
  } else {
    useAuthStore.getState().clearToken();
  }

  return res;
};

// 로그아웃 요청
export const logout = async () => {
  const token = useAuthStore.getState().token;
  const res = await axios.post(`/api/v1/users/logout`, null, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });

  useAuthStore.getState().clearToken();

  return res;
};

// 유저 정보 가져오기
export const fetchUserInfo = async () => {
  const token = useAuthStore.getState().token;

  const res = await axios.get(`/api/auth/profile`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const naverLogin = () => {
  window.location.href = `${API_URL}/oauth2/authorization/naver`;
};
export const googleLogin = () => {
  window.location.href = `${API_URL}/oauth2/authorization/google`;
};
export const kakaoLogin = () => {
  window.location.href = `${API_URL}/oauth2/authorization/kakao`;
};
