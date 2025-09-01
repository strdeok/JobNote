"use client";

import LoadingSpinner from "@/app/_components/loadingSpinner";
import { useNickname } from "@/hooks/useUser";
import { useState } from "react";

export default function SetNickNameScreen() {
  const [nickname, setNickname] = useState("");
  const { mutate, isPending, isSuccess, isError } = useNickname();
  const handleSubmit = () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    try {
      mutate(nickname);
    } catch (error) {
      throw error;
    }
  };
  const button_style = "w-full bg-main rounded-xs text-white py-1";
  return (
    <div className="h-full p-8">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        {isError ? (
          <span>오류가 발생하였습니다.</span>
        ) : isPending ? (
          <LoadingSpinner />
        ) : isSuccess ? (
          <span>변경이 완료되었습니다.</span>
        ) : (
          <>
            <input
              type="text"
              placeholder="변경하실 닉네임을 입력해주세요."
              className="w-full border border-[#D9D9D9] py-1 rounded-xs pl-2"
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <button className={button_style} onClick={handleSubmit}>
              변경하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
