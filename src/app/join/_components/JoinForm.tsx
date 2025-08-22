"use client";

import React, { useState, useEffect } from "react";
import EmptyCheckCircle from "@/assets/EmptyCheckCircle.svg";
import FilledCheckCircle from "@/assets/FilledCheckCircle.svg";
import EyeInvisible from "@/assets/EyeInvisible.svg";
import PrivacyPolicy from "./PrivacyPolicy";
import ServiceTermsSection from "./ServiceTermsSection";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function JoinForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const [allAgree, setAllAgree] = useState(false);
  const [firstAgree, setFirstAgree] = useState(false);
  const [secondAgree, setSecondAgree] = useState(false);

  const [showServiceTerms, setShowServiceTerms] = useState(false);
  const [showPrivacyTerms, setShowPrivacyTerms] = useState(false);

  // 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 닉네임 유효성 검사
  const validateName = (name: string) => {
    return name.trim().length > 0;
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{8,20}$/;
    return passwordRegex.test(password);
  };

  // 이메일 블러 시 에러 처리
  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
    } else if (!validateEmail(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailError("");
    }
  };

  // 비밀번호 블러 시 에러 처리
  const passwordBlur = () => {
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    } else if (!validatePassword(password)) {
      setPasswordError("비밀번호 형식이 올바르지 않습니다.");
    } else setPasswordError("");
  };

  // 비밀번호 일치 확인
  const password2Blur = () => {
    if (password !== password2) {
      setPassword2Error("비밀번호가 일치하지 않습니다.");
    } else {
      setPassword2Error("");
    }
  };

  // 전체동의 -> 개별 동의 모두 적용
  const toggleAllAgree = () => {
    const next = !allAgree;
    setAllAgree(next);
    setFirstAgree(next);
    setSecondAgree(next);
  };

  // 개별 동의 변경 시 전체 동의 자동 반영
  useEffect(() => {
    if (firstAgree && secondAgree) {
      setAllAgree(true);
    } else {
      setAllAgree(false);
    }
  }, [firstAgree, secondAgree]);

  // 제출 조건: 이메일/비번 유효 + 비밀번호 일치 + 필수 동의 두 개
  const isDisabledSubmit =
    !validateEmail(email) ||
    !validateName(name) ||
    !validatePassword(password) ||
    password2Error !== "" ||
    !firstAgree ||
    !secondAgree;

  const submitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email,
      password,
      nickname: name,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/signup`, data)
      .then(() => {
        alert("인증 메일을 발송했습니다. 메일함을 확인해주세요.");
        router.replace("/login");
      })
      .catch((err) => {
        const error = err.response.data.message;

        switch (error) {
          case "이미 가입된 이메일입니다.":
            alert("이미 가입된 이메일입니다.");
            break;
          case "이미 사용중인 닉네임입니다.":
            alert("이미 사용중인 닉네임입니다.");

          default:
            break;
        }
      });
  };

  // 스타일 변수
  const inputWrapper = "flex flex-col gap-2";
  const inputStyle = "border border-[#D9D9D9] rounded-xs h-8 px-2";
  const checkBoxWrapper = "flex flex-row justify-between";
  const checkBox = "flex flex-row items-center gap-1";
  const checkButton = "hover:cursor-pointer";

  return (
    <form
      className="flex flex-col w-full gap-8 text-sm"
      onSubmit={(e) => {
        submitSignUp(e);
      }}
    >
      {/* 이메일 */}
      <div className={inputWrapper}>
        <label htmlFor="id" className="text-[#424242]">
          <span className="text-[#FF4D4F]">*</span> id
        </label>
        <input
          type="text"
          id="id"
          className={inputStyle}
          onBlur={handleEmailBlur}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <span className="text-red-500">{emailError}</span>}
      </div>

      {/* 이름 */}
      <div className={inputWrapper}>
        <label htmlFor="name" className="text-[#424242]">
          <span className="text-[#FF4D4F]">*</span> name
        </label>
        <input
          type="text"
          id="name"
          placeholder="닉네임을 입력하세요."
          className={inputStyle}
          onChange={(e) => {
            setName(e.target.value.trim());
          }}
        />
      </div>

      {/* 비밀번호 */}
      <div className={inputWrapper}>
        <label htmlFor="pw" className="text-[#424242]">
          <span className="text-[#FF4D4F]">*</span> password
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={inputStyle}
          onBlur={passwordBlur}
        />
        {passwordError && <span className="text-red-500">{passwordError}</span>}

        {/* 비밀번호 확인 */}
        <div className="relative flex flex-row items-center">
          <input
            type={isVisiblePassword ? "text" : "password"}
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            onBlur={password2Blur}
            disabled={!validatePassword(password)}
            className={`w-full
                ${
                  !validatePassword(password)
                    ? `${inputStyle} bg-[#F5F5F5]`
                    : inputStyle
                }
                `}
          />
          <button
            type="button"
            className="absolute right-2"
            onClick={() => {
              setIsVisiblePassword((prev) => !prev);
            }}
          >
            <EyeInvisible />
          </button>
        </div>
        {password2Error && (
          <span className="text-red-500">{password2Error}</span>
        )}
      </div>

      {/* 전체동의 */}
      <div className={checkBox}>
        <label
          htmlFor="all-agree"
          onClick={toggleAllAgree}
          className={checkButton}
        >
          {allAgree ? <FilledCheckCircle /> : <EmptyCheckCircle />}
        </label>
        <input type="checkbox" id="all-agree" className="hidden" />
        <label htmlFor="all-agree">전체동의</label>
      </div>

      {/* (필수) 서비스 이용약관 동의 */}
      <div>
        <div className={checkBoxWrapper}>
          <div className={checkBox}>
            <label
              htmlFor="agree1"
              onClick={() => {
                setFirstAgree((prev) => !prev);
              }}
              className={checkButton}
            >
              {firstAgree ? <FilledCheckCircle /> : <EmptyCheckCircle />}
            </label>
            <input type="checkbox" id="agree1" className="hidden" />
            <label htmlFor="agree1">
              <span className="text-[#FF9016]">(필수)</span>서비스 이용 약관
              동의
            </label>
          </div>
          <button
            type="button"
            onClick={() => setShowServiceTerms((prev) => !prev)}
            className="underline text-[0.5rem] text-[#747474]"
          >
            {showServiceTerms ? "접기" : "보기"}
          </button>
        </div>

        <div
          className={`overflow-scroll transition-all duration-300 ease-in-out custom-scrollbar rounded-sm ${
            showServiceTerms
              ? "max-h-[22.5rem] opacity-100 mt-2" // 22.5rem = 360px
              : "max-h-0 opacity-0"
          }`}
        >
          <ServiceTermsSection />
        </div>
      </div>

      {/* (필수) 개인정보 수집 및 이용 동의 */}
      <div>
        <div className={checkBoxWrapper}>
          <div className={checkBox}>
            <label
              htmlFor="agree2"
              onClick={() => {
                setSecondAgree((prev) => !prev);
              }}
              className={checkButton}
            >
              {secondAgree ? <FilledCheckCircle /> : <EmptyCheckCircle />}
            </label>
            <input type="checkbox" id="agree2" className="hidden" />
            <label htmlFor="agree2">
              <span className="text-[#FF9016]">(필수)</span>개인정보 수집 및
              이용 동의
            </label>
          </div>
          <button
            type="button"
            onClick={() => setShowPrivacyTerms((prev) => !prev)}
            className="underline text-[0.5rem] text-[#747474]"
          >
            {showPrivacyTerms ? "접기" : "보기"}
          </button>
        </div>

        <div
          className={`overflow-y-scroll transition-all duration-300 ease-in-out custom-scrollbar rounded-sm ${
            showPrivacyTerms
              ? "max-h-[22.5rem] opacity-100 mt-2"
              : "max-h-0 opacity-0"
          }`}
        >
          <PrivacyPolicy />
        </div>
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={isDisabledSubmit}
        className={`w-full h-8 rounded-xs shadow-[0_2px_0_rgba(0,0,0,0.043)] ${
          isDisabledSubmit
            ? "border border-[#D9D9D9]"
            : "bg-[#FF9016] text-white"
        }`}
      >
        회원가입
      </button>
    </form>
  );
}
