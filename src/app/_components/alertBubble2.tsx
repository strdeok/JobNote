import Building from "@/assets/Building.svg";

export default function AlertBubble2() {
  return (
    <div className="absolute w-[31.25rem] aspect-[50/13] bg-white rounded-[20px] flex flex-col p-5 gap-4 shadow-md bottom-[8.4%] right-[12.92%] z-50">
      <div className="flex flex-col justify-center w-28">
        <div className="flex flex-row items-center gap-1">
          <div className="flex items-center justify-center">
            <Building />
          </div>
          <p className="font-semibold text-xl text-[#485C8B] tracking-tight">
            Jobnote
          </p>
        </div>
        <div className="text-xs text-[#012224] text-center">
          내 커리어 관리의 시작
        </div>
      </div>

      <p className="text-2xl font-medium">D-2 최종면접이 얼마 남지 않았어요!</p>
    </div>
  );
}
