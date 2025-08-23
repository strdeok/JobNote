import DocumentDescription from "./_components/documentDescription";
import PdfViewer from "./_components/previewDocuments";

type Params = Promise<{ documentId: string }>;

export default async function DetailedDocumentsPage({
  params,
}: {
  params: Params;
}) {
  const { documentId } = await params;
  console.log(documentId);
  return (
    <div className="flex flex-row pb-24 mt-8 gap-10">
      <PdfViewer />
      <DocumentDescription />
    </div>
  );
}
