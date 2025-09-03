"use client";

import Link from "next/link";
import {
  useFetchAllApplications,
  useUpdateApplication,
} from "@/hooks/useApplications";
import Divider from "../documents/_components/divider";
import LoadingSpinner from "@/app/_components/loadingSpinner";
import SearchIcon from "@/assets/Search.svg";
import PlusIcon from "@/assets/Plus.svg";
import { CompanyApplicationWithId } from "@/type/applicationType";
import DropDownButton from "./_components/dropDonwButton";

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function ApplicationsPage() {
  const { data, isLoading, isError } = useFetchAllApplications();
  const { mutate } = useUpdateApplication();

  const applications = data?.data.data.content || [];

  const th_style = "relative text-center p-4 text-sm font-medium";
  const td_style = "text-center p-4 text-sm";

  const handleStatusChange = (app: { id: number }, status: string) => {
    const changedApp = { ...app, status };
    mutate(
      { applicationId: app.id, changedApplication: changedApp },
      {
        onError: () => {
          alert("오류가 발생하였습니다. 잠시 후 시도해주세요.");
        },
      }
    );
  };

  // 링크 생성용 함수
  const formatUrl = (url?: string) => {
    if (!url) return "";

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <>
      <div className="flex flex-row justify-end items-center gap-2 mt-8">
        <div className="border border-[#D9D9D9] rounded-sm flex items-center">
          <input
            type="text"
            placeholder="회사명 검색하기"
            className="px-2 py-1 outline-none"
          />
          <button className="px-2 py-1 border-l border-l-[#D9D9D9]">
            <SearchIcon />
          </button>
        </div>
        <Link
          href="/applications/new"
          className="flex flex-row items-center border gap-2.5 border-main bg-white rounded-sm text-main py-1.5 px-2.5"
        >
          <PlusIcon width={14} height={14} fill={"#FF9016"} /> 지원내역 등록
        </Link>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      )}

      {isError && !isLoading && (
        <div className="text-center mt-8 p-4 bg-red-50 rounded-md">
          에러가 발생하였습니다. <br /> 잠시 후 시도해주세요.
        </div>
      )}

      {!isLoading && !isError && (
        <table className="table-auto w-full border-collapse mt-4">
          <thead>
            <tr className="border-b border-b-black/5 bg-[#FAFAFA]">
              <th className={th_style}>
                회사명 <Divider />
              </th>
              <th className={th_style}>
                지역 <Divider />
              </th>
              <th className={th_style}>
                이력서 <Divider />
              </th>
              <th className={th_style}>
                포트폴리오 <Divider />
              </th>
              <th className={th_style}>
                마감일 <Divider />
              </th>
              <th className={th_style}>
                상태 <Divider />
              </th>
              <th className={th_style}></th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app: CompanyApplicationWithId) => {
              const resume = app.documents?.find(
                (doc: any) => doc.type === "RESUME"
              );
              const portfolio = app.documents?.find(
                (doc: any) => doc.type === "PORTFOLIO"
              );
              const deadline =
                app.schedules?.find((s: any) => s.title === "마감일")
                  ?.dateTime || null;
              const companyLink = formatUrl(app.companyUrl);

              return (
                <tr
                  key={app.id ?? app.companyName}
                  className="border-b border-b-black/5"
                >
                  <td className={td_style}>
                    <a href={companyLink}>{app.companyName}</a>
                  </td>
                  <td className={td_style}>{app.companyAddress || "-"}</td>
                  <td className={td_style}>{resume ? resume.title : "-"}</td>
                  <td className={td_style}>
                    {portfolio ? portfolio.title : "-"}
                  </td>
                  <td className={td_style}>{formatDate(deadline)}</td>
                  <td className={td_style}>
                    <select
                      className="inline-flex items-center gap-2 border rounded-md px-3 py-1 text-xs"
                      value={app.status}
                      onChange={(e) => {
                        handleStatusChange(app, e.target.value);
                      }}
                    >
                      <option value="PLANNED">지원 예정</option>
                      <option value="APPLIED">지원 완료</option>
                      <option value="DOCUMENT_PASSED">서류 합격</option>
                      <option value="REJECTED">불합격</option>
                      <option value="FINAL_PASSED">최종 합격</option>
                    </select>
                  </td>
                  <td className={td_style}>
                    <DropDownButton companyUrl={companyLink} id={app.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
