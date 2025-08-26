"use client";

import { logout } from "@/lib/auth";

export default function LogoutButton() {
  const handleLogout = () => {
    logout()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
