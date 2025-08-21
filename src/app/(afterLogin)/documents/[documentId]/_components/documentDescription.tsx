import PlusCircleIcon from "@/assets/PlusCircle.svg";
import Divider from "../../_components/divider";
import DownloadIcon from "@/assets/Download.svg";
import UploadIcon from "@/assets/Upload.svg";

export default function DocumentDescription() {
  const companies = [
    {
      name: "카카오 엔터프라이즈",
      location: "서울특별시 ~~~",
      status: "지원완료",
    },
  ];

  const th_style = "relative text-center p-4 font-medium";
  const td_stytle = "text-center p-4";
  return (
    <div className="flex-1 flex flex-col justify-between">
      

      <div className="flex flex-col gap-4">
        <h2 className="text-3xl mb-6">이력서</h2>
        {companies.map((company) => {
          return (
            <section className="border border-[#747474] rounded-sm px-5 py-2.5 flex flex-col gap-5">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4 items-center">
                  <h3 className="font-semibold text-2xl">{company.name}</h3>
                  <span className="text-xs bg-[#66B5FF] text-white px-2 py-1 rounded-xs">
                    {company.status}
                  </span>
                </div>

                <button className="text-white bg-[#FF4D4F] px-2 py-px text-sm rounded-xs">
                  삭제
                </button>
              </div>

              <span className="">주소: {company.location}</span>
            </section>
          );
        })}
        <button className="border border-[#747474] rounded-sm flex justify-center py-3">
          <PlusCircleIcon />
        </button>
      </div>

      <div>
        <h3 className="font-medium text-3xl">버전 관리</h3>

        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] w-full">
              <th className={th_style}>
                파일명
                <Divider />
              </th>
              <th className={th_style}>
                Version
                <Divider />
              </th>
              <th className={th_style}>
                종류
                <Divider />
              </th>
              <th className={th_style}>
                업로드날짜
                <Divider />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={td_stytle}>이력서</td>
              <td className={td_stytle}>Version1</td>
              <td className={td_stytle}>이력서</td>
              <td className={td_stytle}>2025/01/01</td>
              <td className={td_stytle}>
                <button>
                  <DownloadIcon />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button className="w-full flex justify-center items-center gap-2 border border-[#D9D9D9] text-sm py-1.5">
          <UploadIcon /> Upload
        </button>
      </div>
    </div>
  );
}
