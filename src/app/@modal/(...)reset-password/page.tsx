import ResetPasswordForm from "@/app/reset-password/_components/resetPasswordForm";

export default function ResetPasswordModal() {
  return (
    <>
      <div
        className="bg-white w-[26.25rem] rounded-lg p-10 relative flex flex-col justify-center items-center gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <ResetPasswordForm />
      </div>
    </>
  );
}
