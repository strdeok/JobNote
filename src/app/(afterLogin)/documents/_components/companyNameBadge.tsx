export default function CompanyNameBadge({ children }: { children: string }) {
  return (
    <div className="bg-[#FFF5EB] px-2 py-px w-fit rounded-xs  flex-shrink-0">
      {children}
    </div>
  );
}
