"use client";

import { usePathname } from "next/navigation";
import WarningCircleIcon from "@/assets/WarningCircle.svg";
import MessageBubble from "./messageBubble";
import { useState } from "react";

export default function PageTitle() {
  const [isActivateMessage, setIsActivateMessage] = useState(false);

  const router = usePathname();
  const title = () => {
    switch (router) {
      case "/applications":
        return "지원 현황";
      case "/documents":
        return "문서 관리";
      case "/schedule":
        return "일정";
      case "/dashboard":
        return "Dashboard";
    }
  };

  const message = () => {
    switch (router) {
      case "/applications":
        return "지원 현황";
      case "/documents":
        return "문서를 업로드하고, 버전별로 체계적으로 관리하세요";
      case "/schedule":
        return "일정";
      default:
        return "";
    }
  };
  return (
    <div className="bg-[#F5F5F5] w-full h-36 relative">
      <div className="absolute bottom-6 left-80 flex flex-row items-center gap-2">
        <h1 className="font-medium text-4xl">{title()}</h1>
        {router !== "/dashboard" && (
          <div className="relative flex items-center">
            <div
              onMouseEnter={() => {
                setIsActivateMessage(true);
              }}
              onMouseLeave={() => {
                setIsActivateMessage(false);
              }}
            >
              <WarningCircleIcon />
            </div>
            {isActivateMessage && <MessageBubble>{message()}</MessageBubble>}
          </div>
        )}
      </div>
    </div>
  );
}
