"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSocialSignUp } from "@/hooks/useAuth";

export default function SetNicknamePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [nickname, setNickname] = useState("");

  const mutation = useSocialSignUp();

  const handleSubmit = () => {
    if (!nickname) return;

    mutation.mutate(
      { email: email, nickname: nickname },
      {
        onSuccess: () => {
          window.location.replace("/dashboard");
        },
        onError: (error) => {
          console.error(error);
          alert("오류가 발생하였습니다.");
        },
      }
    );
  };

  return (
    <div className="w-96 h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4">
      <input
        type="text"
        placeholder="닉네임을 입력해주세요."
        className="w-full border border-[#D9D9D9] py-1 rounded-xs pl-2"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button
        className="w-full bg-main rounded-xs text-white py-1"
        onClick={handleSubmit}
      >
        등록하기
      </button>
    </div>
  );
}
