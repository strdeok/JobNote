"use client";

import { useRouter } from "next/navigation";
import FindPasswordForm from "@/app/login/_components/findPasswordForm";

export default function FindPasswordModal() {
  const router = useRouter();

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-50 flex justify-center items-center"
      onClick={() => router.back()}
    >
      <div
        className="bg-white w-md rounded-lg p-10 relative flex flex-col justify-center items-center gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <FindPasswordForm />
      </div>
    </div>
  );
}
