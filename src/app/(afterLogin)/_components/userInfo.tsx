"use client";

import Image from "next/image";
import LoadingSpinner from "@/app/_components/loadingSpinner";
import { useUserInfo } from "@/hooks/useUser";
import DefaultAvatarIcon from "@/assets/User.svg";

export default function UserInfo() {
  const { data, error, isLoading } = useUserInfo();
  if (error) {
    return (
      <div className="text-red-500 text-center">
        오류가 발생하였습니다. <br /> 잠시 후 시도해주세요.
      </div>
    );
  }

  return (
    <div id="personal-infomation" className="flex flex-col items-center gap-6">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="relative flex justify-center items-center bg-[#BFBFBF] rounded-full size-16">
            {data?.avatarUrl ? (
              <Image
                fill
                src={data?.avatarUrl}
                alt="avatar"
                className="bg-[#BFBFBF] rounded-full size-16"
              />
            ) : (
              <DefaultAvatarIcon />
            )}
          </div>
          <span className="text-2xl font-medium">{data?.nickname}</span>
        </>
      )}
    </div>
  );
}
