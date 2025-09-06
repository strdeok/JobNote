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

// 소셜 회원가입 요청
export const socialSignUp = async (email: string, nickname: string) => {
  const res = await axios.post(`/api/auth/social-signup`, { email, nickname });
  return res.data;
};


// 소셜 로그인 요청
export const socialLogin = async (code: string) => {
  console.log(code);
  const res = await axios.post(`/api/auth/social-login`, { code: code }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// 비밀번호 찾기 이메일 보내기
export const findPassword = async (email: string) => {
  const token = useAuthStore.getState().token;
  const res = await axios.post(
    `/api/auth/find-password/email`,
    {email},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
