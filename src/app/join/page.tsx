import Building from "@/assets/Building.svg";
import JoinForm from "./_components/JoinForm";

export default function JoinPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="font-bold text-4xl flex flex-row gap-1 p-10 box-content">
        <Building />
        JobNote
      </header>

      <div className="flex-1 flex items-center justify-center w-full">
        <main className="w-[27.5rem] flex flex-col items-center box-border p-10 gap-8"> {/* 27.5rem = 440px */}
          <h1 className="text-3xl">회원가입</h1>
          <JoinForm />
        </main>
      </div>
    </div>
  );
}
