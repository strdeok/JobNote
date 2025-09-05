"use client";

import { useDocument } from "@/hooks/useDocuments";
import DocumentDescription from "./documentDescription";
import PdfViewer from "./previewDocuments";

export default function DocumentView({ documentId }: { documentId: string }) {
  const { data, isLoading, error } = useDocument(documentId);

  const documentVersions = data?.data.data.content;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">문서를 가져오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">
          문서를 가져오는 중에 오류가 발생하였습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row pb-24 mt-8 gap-10 w-full">
      <PdfViewer documentFileUrl={documentVersions[0].fileUrl} documentTitle={documentVersions[0].title} />
      <DocumentDescription documentVersions={documentVersions} />
    </div>
  );
}
