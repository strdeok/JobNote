"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EyeInvisible from "@/assets/EyeInvisible.svg";
import { resetPassword } from "@/lib/users";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const validatePassword = (password: string) => {
    // 규칙: 8~20자, 영문 대소문자, 숫자 포함, 특수문자는 option
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{8,20}$/;
    return passwordRegex.test(password);
  };

  const checkValidatePassword = () => {
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    } else if (!validatePassword(password)) {
      setPasswordError(
        "비밀번호는 8~20자, 영문 대소문자, 숫자를 포함해야 합니다."
      );
    } else {
      setPasswordError("");
    }
  };

  const checkConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("비밀번호 확인을 입력해주세요.");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = () => {
    if (
      password &&
      confirmPassword &&
      password === confirmPassword &&
      validatePassword(password)
    ) {
      resetPassword(password).then(() => {
        console.log("비밀번호 재설정:", password);
        setIsSuccess(true);
      });
    }
  };

  if (isSuccess) {
    return (
      <>
        <h1 className="text-4xl">비밀번호 찾기</h1>
        <span className="text-center text-sm font-light">
          비밀번호가 성공적으로 변경되었습니다.
          <br />
          새로운 비밀번호로 로그인해주세요.
        </span>

        <button
          onClick={() => router.push("/login")}
          className="bg-[#FF9016] text-white w-full rounded-xs py-1"
        >
          로그인으로 이동
        </button>
      </>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col items-center gap-4 mb-8">
        <h1 className="text-[2rem] font-medium">비밀번호 찾기</h1>
        <h2 className="font-light text-center">
          변경할 비밀번호를 입력해주세요
        </h2>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-[#424242] text-sm mb-2 flex flex-row items-center gap-1"
          >
            <span className="text-[#FF4D4F]">*</span>
            password
          </label>

          <input
            id="password"
            type={isVisiblePassword ? "text" : "password"}
            className={`rounded-xs border border-[#D9D9D9] h-8 p-3 placeholder:text-sm ${
              passwordError ? "border-red-400" : ""
            }`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            onBlur={checkValidatePassword}
            placeholder="영문 대소문자, 숫자를 포함하여 8~20로 입력하세요"
          />
          <span className="text-red-400 text-xs">{passwordError}</span>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row relative items-center">
            <input
              id="confirmPassword"
              type={isVisiblePassword ? "text" : "password"}
              disabled={!password}
              className={`w-full rounded-xs border border-[#D9D9D9] h-8 p-3 ${
                confirmPasswordError ? "border-red-400" : ""
              }
              ${!password ? "bg-[#F5F5F5]" : ""}`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError("");
              }}
              onBlur={checkConfirmPassword}
            />
            <button
              className="absolute right-2"
              onClick={() => {
                setIsVisiblePassword((prev) => !prev);
              }}
            >
              <EyeInvisible />
            </button>
          </div>
          <span className="text-red-400 text-xs">{confirmPasswordError}</span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={
          !password ||
          !confirmPassword ||
          password !== confirmPassword ||
          !validatePassword(password)
        }
        className={`w-full rounded-xs py-1 mt-8  ${
          !password ||
          !confirmPassword ||
          password !== confirmPassword ||
          !validatePassword(password)
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#FF9016] text-white"
        }`}
      >
        비밀번호 변경
      </button>
    </>
  );
}
