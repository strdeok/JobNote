"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
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
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useFetchAllApplications(
    page,
    searchQuery
  );
  const { mutate } = useUpdateApplication();

  const applications = data?.data.content;

  const pageInfo = data?.data;

  const filteredApplications = useMemo(() => {
    if (!searchQuery) {
      return applications;
    }
    return applications.filter((app: CompanyApplicationWithId) =>
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, applications]);

  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNextPage = () =>
    setPage((prev) => Math.min(prev + 1, pageInfo.totalPages - 1));

  // 특정 페이지 클릭
  const handlePageClick = (i: number) => setPage(i);

  const th_style = "relative text-center p-4 text-sm font-medium";
  const td_style = "text-center p-4 text-sm";

  const handleStatusChange = (
    app: CompanyApplicationWithId,
    status: string
  ) => {
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter"}
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
        <>
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
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app: CompanyApplicationWithId) => {
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
                        <a
                          href={companyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {app.companyName}
                        </a>
                      </td>
                      <td className={td_style}>{app.companyAddress || "-"}</td>
                      <td className={td_style}>
                        {resume ? resume.title : "-"}
                      </td>
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
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    {searchQuery
                      ? "검색 결과가 없습니다."
                      : "등록된 지원내역이 없습니다."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {pageInfo && pageInfo.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pb-8">
              <button
                onClick={handlePrevPage}
                disabled={pageInfo.first}
                className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              {Array.from({ length: pageInfo.totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageClick(i)}
                  className={`px-3 py-1 border rounded-md ${
                    page === i ? "bg-main text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={pageInfo.last}
                className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
