import CloseIcon from "@/assets/Close.svg";

export default function CompanyNameBadge({ children }: { children: string }) {
  return (
    <div className="bg-[#FFF5EB] px-2 py-px w-fit rounded-xs">
      {children}
      <button className="ml-1">
        <CloseIcon width={12} height={12} className="text-black/45" />
      </button>
    </div>
  );
}
