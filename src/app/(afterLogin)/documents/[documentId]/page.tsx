import DocumentDescription from "./_components/documentDescription";
import PdfViewer from "./_components/previewDocuments";

type Props = {
  params: { documentId: string };
};

export default function DetailedDocumentsPage({ params }: Props) {
  console.log(params.documentId);
  return (
    <div className="flex flex-row pb-24 mt-8 gap-10">
      <PdfViewer />
      <DocumentDescription />
    </div>
  );
}
