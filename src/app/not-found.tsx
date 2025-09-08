import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <p>죄송합니다. 찾을 수 없는 페이지입니다.</p>
      <Link className="bg-main text-white px-4 py-2 rounded-md" href="/dashboard">홈으로 돌아가기</Link>
    </div>
  );
}
