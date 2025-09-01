export default function VersionBadge({ children }: { children: number }) {
  return (
    <div className="flex justify-center">
      <div className="bg-main px-2 py-1 text-white text-xs rounded-xs flex items-center">
        V{children}
      </div>
    </div>
  );
}
