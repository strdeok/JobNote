import UploadIcon from "@/assets/Upload.svg";

export default function UploadButton() {
  return (
    <div className="flex justify-center">
        <button className="flex flex-row items-center gap-2 px-4 py-1 border border-[#D9D9D9] rounded-xs">
          <UploadIcon />
          업로드
        </button>
    </div>
  );
}
