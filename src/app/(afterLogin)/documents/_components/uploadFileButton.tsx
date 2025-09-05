import React, { useRef, useEffect } from "react";
import { useUploadFile } from "@/hooks/useFile";
import UploadIcon from "@/assets/Upload.svg";
import { useUpdateDocument } from "@/hooks/useDocuments";

export default function UploadFileButton({
  setFileKey,
  setFileInfo,
  isUpdate,
  documentId,
  newDocumentTitle,
}: {
  setFileKey: (key: string) => void;
  setFileInfo: (info: File) => void;
  isUpdate: boolean;
  documentId?: number;
  newDocumentTitle?: string;
}) {
  const uploadMutation = useUploadFile();
  const updateMutation = useUpdateDocument();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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
          setFileKey(data.fileKey);

          if (isUpdate && documentId) {
            updateMutation.mutate({
              id: documentId.toString(),
              fileInfo: {
                title: newDocumentTitle || "",
                fileName: selectedFile.name,
                fileKey: data.fileKey,
                fileType: "RESUME",
                fileSize: selectedFile.size,
              },
            });
          }
          timerRef.current = setTimeout(() => {
            uploadMutation.reset();
          }, 3000);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  return (
    <div className="flex justify-center">
      <input
        type="file"
        onChange={handleChange}
        hidden
        ref={fileInputRef}
        accept=".pdf, .doc, .docx, .hwp, .txt"
      />
      <button
        onClick={handleUploadClick}
        className="flex flex-row items-center gap-2 px-4 py-1 border border-[#D9D9D9] rounded-xs"
      >
        <UploadIcon />
        {!uploadMutation.isPending &&
          !uploadMutation.isSuccess &&
          !uploadMutation.isError && <p className="text-sm">Upload</p>}

        {uploadMutation.isPending && (
          <p className="text-sm text-gray-500">Uploading...</p>
        )}

        {uploadMutation.isSuccess && <p className="text-sm ">완료</p>}

        {uploadMutation.isError && <p className="text-sm text-red-600">실패</p>}
      </button>
    </div>
  );
}
