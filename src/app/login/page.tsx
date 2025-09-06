import Link from "next/link";
import LoginForm from "./_components/loginForm";
import Building from "@/assets/Building.svg";
import SocialLogin from "./_components/socialLogin";
import AnimatedCardStack from "./_components/animatedCardStack";

export default function LoginPage() {
  return (
    <div className="flex flex-row w-full h-full items-center px-24 py-16 gap-20">
      <AnimatedCardStack />

      <div id="login-section " className="m-auto w-96 px-16">
        <div id="title" className="flex flex-col items-center mb-8">
          <div className="flex flex-row items-center gap-2 mb-2">
            <Building />
            <h1 className="font-bold text-4xl text-[#485C8B]">Jobnote</h1>
          </div>
          <span className="text-xs text-[#012224]">내 커리어 관리의 시작</span>
        </div>

        <LoginForm />

        <Link
          href="/join"
          className="w-full text-center text-sm mt-2 inline-block text-[#616161]"
        >
          계정이 없으신가요? <span className="text-[#FF9016]">회원가입</span>
        </Link>
        <SocialLogin />
      </div>
    </div>
  );
}
