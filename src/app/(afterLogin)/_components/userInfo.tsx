"use client";

import LoadingSpinner from "@/app/_components/loadingSpinner";
import { useUserInfo } from "@/hooks/useUserInfo";

export default function UserInfo() {
  const { data, error, isLoading } = useUserInfo();
  if (error) {
    console.log(error)
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
          <div className="bg-[#BFBFBF] rounded-full size-16"></div>
          <span className="text-2xl font-medium">{data?.nickname}</span>
        </>
      )}
    </div>
  );
}
