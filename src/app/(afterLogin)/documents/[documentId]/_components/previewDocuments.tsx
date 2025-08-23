export default function PreviewDocuments() {
  return (
    <div className="flex-1 flex flex-col items-center">
      <iframe
        src="/sample.pdf"
        title="PDF Viewer"
        className="w-full h-[38rem]"
      ></iframe>
      <span className="font-medium text-2xl">이력서.pdf</span>
    </div>
  );
}
