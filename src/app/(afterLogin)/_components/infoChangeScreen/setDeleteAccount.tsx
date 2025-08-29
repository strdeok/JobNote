"use client";

import LoadingSpinner from "@/app/_components/loadingSpinner";
import { useDeleteUser } from "@/hooks/useUser";

export default function DeleteAccountScreen() {
  const { mutate, isPending, isError, isSuccess } = useDeleteUser();
  const handleSubmit = () => {
    mutate();
  };

  const button_style = "w-full bg-[#FF4D4F] rounded-xs text-white py-1";
  return (
    <div className="h-ful px-4">
      <div className="w-full h-full flex flex-col items-center justify-center">
        {isError ? (
          <span>오류가 발생하였습니다.</span>
        ) : isPending ? (
          <LoadingSpinner />
        ) : isSuccess ? (
          <span>탈퇴가 완료되었습니다.</span>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mt-4 mb-6">
              탈퇴하시겠습니까?
            </h3>

            <span className="break-keep text-center mb-4">
              탈퇴 시 모든 개인정보와 이용 기록이 삭제되며 복구가 불가능합니다.
            </span>

            <span className="break-keep text-center mb-4">
              탈퇴 후에는 계정 및 데이터 복구가 불가능하오니 신중히 진행해주시기
              바랍니다.
            </span>

            <button className={button_style} onClick={handleSubmit}>
              회원 탈퇴
            </button>
          </>
        )}
      </div>
    </div>
  );
}
