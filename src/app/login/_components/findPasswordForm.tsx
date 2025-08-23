"use client";

import CloseIcon from "@/assets/Close.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FindPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSuccessSending, setIsSuccessSending] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkValidateEmail = () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
    } else if (!validateEmail(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailError("");
    }
  };

  const sendFindPasswordEmail = () => {
    console.log(email);
    setIsSuccessSending(true);
  };

  if (isSuccessSending) {
    return (
      <>
        <h1 className="text-4xl">비밀번호 찾기</h1>
        <span className="text-center text-sm font-light">
          비밀번호 재설정 링크를 회원님의 이메일로 전송했습니다.
          <br /> 이메일을 확인하신 후, 안내에 따라 비밀번호를 변경해 주세요.
          <br /> 메일이 도착하지 않았다면, 스팸함도 함께 확인해 주세요.
        </span>

        <button
          onClick={() => router.back()}
          className="bg-[#FF9016] text-white w-full rounded-xs py-1"
        >
          로그인으로 돌아가기
        </button>
      </>
    );
  } else
    return (
      <>
        <div className="w-full flex flex-col items-center gap-4">
          <h1 className="text-4xl">비밀번호 찾기</h1>
          <h2 className="font-light">
            비밀번호 재설정 링크를 받으실 이메일을 입력해주세요
          </h2>
        </div>

        <button
          className="absolute top-4 right-4"
          onClick={() => router.back()}
        >
          <CloseIcon />
        </button>

        <div className="w-full flex flex-col">
          <label htmlFor="email" className="text-[#BDBDBD] text-xs">
            email
          </label>
          <input
            id="email"
            type="email"
            className={`rounded-sm border border-[#D9D9D9] h-8 p-3 ${
              emailError ? "border-red-400" : ""
            }`}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={() => {
              checkValidateEmail();
            }}
          />
          <span className="text-red-400 text-xs">{emailError}</span>
        </div>

        <button
          onClick={() => sendFindPasswordEmail()}
          className="bg-[#FF9016] text-white w-full rounded-xs py-1"
        >
          전송
        </button>
      </>
    );
}
