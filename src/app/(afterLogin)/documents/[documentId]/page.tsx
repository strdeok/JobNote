import DocumentDescription from "./_components/documentDescription";
import PdfViewer from "./_components/previewDocuments";

export default function DetailedDocumentsPage({
  params,
}: {
  params: { documentId: string };
}) {
  console.log(params.documentId);
  return (
    <div className="flex flex-row pb-24 mt-8 gap-10">
      <PdfViewer />
      <DocumentDescription />
    </div>
  );
}
