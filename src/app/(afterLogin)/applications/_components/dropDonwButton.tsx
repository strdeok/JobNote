import { useDeleteApplication } from "@/hooks/useApplications";
import Link from "next/link";
import { useState } from "react";

export default function DropDownButton({
  companyUrl,
  id,
}: {
  companyUrl: string;
  id: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const { mutate, isPending } = useDeleteApplication();

  const handleNavigate = () => {
    if (!companyUrl) return;

    window.open(companyUrl, "_blank");
  };

  const onDelete = () => {
    try {
      mutate(id, {
        onSuccess: () => {
          alert("삭제가 완료되었습니다.");
        },
        onError: () => {
          alert("삭제에 실패했습니다.");
        },
      });
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="relative inline-block text-left">
      <button
        disabled={isPending}
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full px-3 py-1 text-sm font-medium"
      >
        ...
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <Link
              href={`/applications/edit/${id}`}
              onClick={() => {
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              수정
            </Link>
            <button
              disabled={isPending}
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              삭제
            </button>
            <button
              onClick={() => {
                handleNavigate();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              지원 링크 이동
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
