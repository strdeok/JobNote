export default function PreviewDocuments({
  documentFileUrl,
  documentTitle,
}: {
  documentFileUrl: string;
  documentTitle: string;
}) {
  return (
    <div className="flex-1 flex flex-col items-center">
      <iframe
        src={documentFileUrl}
        title="PDF Viewer"
        className="w-full h-[38rem]"
      ></iframe>
      <span className="font-medium text-2xl">{documentTitle}</span>
    </div>
  );
}
