import FiSrCommentsIcon from "@/assets/fi-sr-comments.svg";

export default function CompanyBubble() {
  return (
    <div className="absolute w-[31.25rem] aspect-[50/13] bg-white rounded-[20px] flex flex-col p-5 gap-4 shadow-md top-[43.36%] right-[2.92%] z-50">
      <div className="flex flex-row items-center gap-5">
        <div className="bg-[#03C75A] rounded-[10px] size-9 flex items-center justify-center">
          <FiSrCommentsIcon />
        </div>
        <p className="font-medium text-2xl">회사</p>
      </div>

      <p className="text-2xl font-medium tracking-tighter">
        [최종합격] 안녕하세요 저희 회사에 지원해주셔서
      </p>
    </div>
  );
}
