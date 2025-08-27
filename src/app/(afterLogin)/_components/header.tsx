"use client";
import LogoutButton from "./logoutButton";

export default function Header() {
  return (
    <div className="flex flex-row justify-between px-10 py-5">
      <span className="font-gmarket text-4xl tracking-tight">Jobnote</span>
      <div>
        <button className="text-main px-4 py-1">고객센터</button>
        <LogoutButton />
      </div>
    </div>
  );
}
