"use client";

import { useState } from "react";
import SetAvatarScreen from "./setAvatar";
import SetPasswordScreen from "./setPassword";
import SetNickNameScreen from "./setNickName";
import DeleteAccountScreen from "./setDeleteAccount";

export default function SelectSection() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const button_style = "w-full bg-main rounded-xs text-white py-1";

  switch (selectedOption) {
    case "avatar":
      return <SetAvatarScreen />;
    case "nickname":
      return <SetNickNameScreen />;
    case "password":
      return <SetPasswordScreen />;
    case "delete":
      return <DeleteAccountScreen />;

    default:
      return (
        <section className="w-full flex flex-col items-center mt-5 gap-3">
          <h3 className="font-medium text-3xl mb-2">개인정보 수정</h3>
          <button
            className={button_style}
            onClick={() => setSelectedOption("avatar")}
          >
            아바타 변경
          </button>
          <button
            className={button_style}
            onClick={() => setSelectedOption("nickname")}
          >
            닉네임 변경
          </button>
          <button
            className={button_style}
            onClick={() => setSelectedOption("password")}
          >
            비밀번호 변경
          </button>
          <button
            className={button_style}
            onClick={() => setSelectedOption("delete")}
          >
            회원 탈퇴
          </button>
        </section>
      );
  }
}
