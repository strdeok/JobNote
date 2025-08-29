"use client";

import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const route = useRouter();
  const handleLogout = () => {
    logout()
      .then(() => {
        route.replace("/login");
      })
      .catch(() => {
        alert("오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
      });
  };
  return (
    <button
      className="bg-main text-white px-4 py-1"
      onClick={() => {
        handleLogout();
      }}
    >
      로그아웃
    </button>
  );
}
