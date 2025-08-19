import Link from "next/link";
import LoginForm from "./_components/loginForm";
import Building from "@/assets/Building.svg"

export default function LoginPage() {
  return (
    <div className="flex flex-row w-full h-full items-center">
      <div id="photo-section" className="bg-gray-400 w-3xl h-10/12 ml-10" />

      <div id="login-section" className="m-auto">
        <div id="title" className="flex flex-col items-center mb-8">
          <div className="flex flex-row items-center gap-2 mb-2">
            <Building />
            <h1 className="font-bold text-4xl">Joblink</h1>
          </div>
          <span className="text-xs">내 커리어 관리의 시작</span>
        </div>

        <LoginForm />

        <Link
          href="/join"
          className="w-full text-center text-sm mt-2 inline-block text-[#616161]"
        >
          계정이 없으신가요? <span className="text-[#FF9016]">회원가입</span>
        </Link>
      </div>
    </div>
  );
}
