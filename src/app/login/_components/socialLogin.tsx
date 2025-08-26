"use client";

import { googleLogin, kakaoLogin, naverLogin } from "@/lib/auth";

export default function SocialLogin() {
  return (
    <div className="flex flex-col">
      <button
        className="border rounded-xs border-[#d5d5d5]"
        onClick={() => {
          naverLogin();
        }}
      >
        네이버 로그인
      </button>
      <button
        className="border rounded-xs border-[#d5d5d5]"
        onClick={() => {
          kakaoLogin();
        }}
      >
        카카오 로그인
      </button>
      <button
        className="border rounded-xs border-[#d5d5d5]"
        onClick={() => {
          googleLogin();
        }}
      >
        구글 로그인
      </button>
    </div>
  );
}
