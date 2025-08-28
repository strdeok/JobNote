"use client";

import { useState } from "react"; // 상태 관리
import { useCreateDocument } from "@/hooks/useDocuments"; // 문서 등록 훅
import UploadFileSection from "./_components/uploadFileSection"; // 파일 업로드 컴포넌트
import DocumentTypeDropDown from "./_components/dropDown";

export default function NewDocumentPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    type: string;
    size: number;
  } | null>(null);

  // 문서 등록 mutation
  const { mutate, isPending } = useCreateDocument();

  // 폼 제출 시 실행
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 값 확인
    if (!title || !type) {
      alert("제목과 종류를 입력해주세요.");
      return;
    }
    if (!fileUrl) {
      alert("파일을 업로드해주세요.");
      return;
    }
    if (!fileInfo || !fileKey) {
      return;
    }

    console.log(fileInfo);

    // 문서 등록 실행
    mutate({
      title,
      fileName: fileInfo?.name,
      fileKey,
      fileType: type,
      fileSize: fileInfo?.size,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md p-4 space-y-4"
    >
      {/* 문서 제목 입력 */}
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-1 font-semibold">
          문서 제목
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
          placeholder="제목을 입력하세요"
        />
      </div>

      {/* 문서 종류 입력 */}
      <div className="flex flex-col">
        <DocumentTypeDropDown type={type} setType={setType} />
      </div>

      {/* 파일 업로드 섹션 */}
      <UploadFileSection
        setFileUrl={setFileUrl}
        setFileKey={setFileKey}
        setFileInfo={setFileInfo}
      />

      {/* 문서 등록 버튼 */}
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isPending ? "등록 중..." : "문서 등록"}
      </button>
    </form>
  );
}
