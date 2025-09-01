import { useState } from "react";
import LoadingSpinner from "@/app/_components/loadingSpinner";
import { useResetPassword } from "@/hooks/useUser";
import EyeInvisibleIcon from "@/assets/EyeInvisible.svg";

export default function SetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [isShowing, setIsShowing] = useState(false);

  const { mutate, isPending, isSuccess, isError } = useResetPassword();

  const handleSubmit = () => {
    if (!password.trim()) {
      alert("새로운 비밀번호를 입력해주세요.");
      return;
    }
    try {
      mutate(password);
    } catch (error) {
      throw error;
    }
  };
  const button_style = "w-full bg-main rounded-xs text-white py-1";
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      {isPending ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        <span>변경이 완료되었습니다.</span>
      ) : isError ? (
        <span>오류가 발생하였습니다.</span>
      ) : (
        <>
          <div className="w-full flex items-center relative">
            <input
              type={isShowing ? "text" : "password"}
              placeholder="새로운 비밀번호를 입력해주세요."
              className="w-full border border-[#D9D9D9] py-1 rounded-xs pl-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-3"
              onClick={() => {
                setIsShowing(!isShowing);
              }}
            >
              <EyeInvisibleIcon />
            </button>
          </div>

          <button className={button_style} onClick={handleSubmit}>
            변경하기
          </button>
        </>
      )}
    </div>
  );
}
