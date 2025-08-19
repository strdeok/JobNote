import FindPasswordForm from "../_components/findPasswordForm";

export default function FindPasswordPage() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-50 flex justify-center items-center">
      <div className="relative bg-white w-md rounded-lg p-10 flex flex-col items-center gap-8 shadow-lg">
        <FindPasswordForm />
      </div>
    </div>
  );
}
