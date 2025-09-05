import DocumentView from "./_components/documentView";

export default async function DetailedDocumentsPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;

  return <DocumentView documentId={documentId} />;
}
