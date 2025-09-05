"use client";

import { googleLogin, kakaoLogin, naverLogin } from "@/lib/auth";
import NaverIcon from "@/assets/Naver.svg";
import KakaoIcon from "@/assets/Kakao.svg";
import GoogleIcon from "@/assets/Google.svg";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
});

export default function SocialLogin() {
  return (
    <div className={`flex flex-col gap-2 mt-4 text-base ${figtree.className}`}>
      <button
        className="border border-[#D8DAE5] rounded-md flex flex-row justify-center items-center gap-4 px-4 py-1.5 font-medium"
        onClick={() => {
          googleLogin();
        }}
      >
        <GoogleIcon />
        Google 로그인
      </button>
      <button
        className="rounded-md bg-[#FEE500] flex flex-row gap-4 justify-center items-center py-1.5"
        onClick={() => {
          kakaoLogin();
        }}
      >
        <KakaoIcon />
        카카오 로그인
      </button>
      <button
        className="rounded-md bg-[#03C75A] text-white flex flex-row gap-4 justify-center items-center py-1.5"
        onClick={() => {
          naverLogin();
        }}
      >
        <NaverIcon />
        네이버 로그인
      </button>
    </div>
  );
}
