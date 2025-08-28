import React from "react";
import { useUploadFile } from "@/hooks/useFile";

export default function UploadFileSection({
  setFileUrl,
  setFileKey,
  setFileInfo,
}: {
  setFileUrl: (url: string) => void;
  setFileKey: (key: string) => void;
  setFileInfo: (info: any) => void;
}) {
  const uploadMutation = useUploadFile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];

    const fileInfo = {
      fileName: selectedFile.name,
      contentType: selectedFile.type,
      fileSize: selectedFile.size,
    };

    setFileInfo(selectedFile);

    uploadMutation.mutate(
      { file: selectedFile, fileInfo },
      {
        onSuccess: (data) => {
          setFileUrl(data.fileUrl);
          setFileKey(data.fileKey);
        },
      }
    );
  };

  return (
    <div className="flex flex-col">
      <label className="mb-1 font-semibold">파일 업로드</label>
      <input type="file" onChange={handleChange} />

      {uploadMutation.isPending && (
        <p className="text-sm text-gray-500">업로드 중...</p>
      )}
      {uploadMutation.isSuccess && (
        <p className="text-sm text-green-600">
          업로드 완료: {uploadMutation.data.fileUrl}
        </p>
      )}
      {uploadMutation.isError && (
        <p className="text-sm text-red-600">업로드 실패! 다시 시도해주세요.</p>
      )}
    </div>
  );
}
