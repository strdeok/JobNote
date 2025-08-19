export default function DashboardPage() {
  const box_style =
    "w-60 border border-[#FF9016] rounded-sm px-9 py-5 flex flex-col gap-4";
  return (
    <section className="relative top-10 flex flex-row gap-6">
      <div className={box_style}>
        <span className="w-full text-left">지원 회사</span>
        <span className="w-full text-right">0개</span>
      </div>
      <div className={box_style}>
        <span className="w-full text-left">서류 합격</span>
        <span className="w-full text-right">0개</span>
      </div>
      <div className={box_style}>
        <span className="w-full text-left">면접 예정</span>
        <span className="w-full text-right">0개</span>
      </div>
      <div className={box_style}>
        <span className="w-full text-left">최종 합격</span>
        <span className="w-full text-right">0개</span>
      </div>
    </section>
  );
}
