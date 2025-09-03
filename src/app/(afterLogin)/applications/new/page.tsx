"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import { useDocuments } from "@/hooks/useDocuments";
import FileIcon from "@/assets/File.svg";
import { useRouter } from "next/navigation";
import { useUploadApplications } from "@/hooks/useApplications";
import {
  ApplicationStatus,
  CompanyApplication,
  ScheduleStatus,
  typeLabels,
} from "@/type/applicationType";

export default function NewApplicationsPage() {
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyScale, setCompanyScale] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>(
    ApplicationStatus.PLANNED
  );

  // 여러 문서를 선택할 수 있도록 배열로 관리
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);

  const [applyDate, setApplyDate] = useState<Date | null>(null);
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);

  const { data, isLoading, isError } = useDocuments();
  const documents = data?.data.data.content;

  const { mutateAsync, isPending: isUploadLoading } = useUploadApplications();

  const router = useRouter();

  // 문서 선택/해제 토글 함수
  const toggleDocument = (docId: number) => {
    setSelectedDocuments((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    );
  };

  // 데드라인 변환
  const getDeadlineStatus = (appStatus: ApplicationStatus): ScheduleStatus => {
    switch (appStatus) {
      case ApplicationStatus.PLANNED:
        return ScheduleStatus.PLANNED;
      case ApplicationStatus.APPLIED:
        return ScheduleStatus.PROGRESS;
      case ApplicationStatus.DOCUMENT_PASSED:
      case ApplicationStatus.FINAL_PASSED:
      case ApplicationStatus.REJECTED:
        return ScheduleStatus.COMPLETED;
      default:
        return ScheduleStatus.PLANNED;
    }
  };

  // 등록 버튼 클릭
  const handleSubmit = async () => {
    const payload: CompanyApplication = {
      companyName,
      companyAddress,
      companyUrl,
      companyScale,
      position,
      status,
      schedules: [
        {
          id: 0,
          title: "지원일",
          dateTime: applyDate ? applyDate.toISOString() : "",
          status: ScheduleStatus.PLANNED,
        },
        {
          id: 1,
          title: "마감일",
          dateTime: deadlineDate ? deadlineDate.toISOString() : "",
          status: getDeadlineStatus(status),
        },
      ],
      // 선택한 문서만 넣기
      documents: selectedDocuments.map((docId) => ({
        id: docId,
      })),
    };

    if (payload.companyName === "") {
      alert("회사이름을 입력하세요.");
      return;
    }

    if (payload.position === "") {
      alert("직무를 입력하세요");
      return;
    }

    try {
      await mutateAsync(payload);

      alert("지원서가 정상적으로 등록되었습니다!");
      router.replace("/applications");
    } catch {
      alert("지원서 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col">
      {/* 기본 정보 */}
      <h2 className="font-medium text-3xl mt-8 mb-6">기본 정보</h2>

      <div className="flex flex-col gap-2 w-96">
        {/* 회사 이름 */}
        <section className="flex flex-col gap-2">
          <label>
            <span className="text-[#FF4D4F]">*</span>회사 이름
          </label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="회사 이름을 작성해주세요."
            className="border border-[#DCDCDC] py-1 px-3 rounded-sm placeholder:text-black/25"
          />
        </section>

        {/* 직무 */}
        <section className="flex flex-col gap-2">
          <label>
            <span className="text-[#FF4D4F]">*</span>직무
          </label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="직무를 입력해주세요."
            className="border border-[#DCDCDC] py-1 px-3 rounded-sm placeholder:text-black/25"
          />
        </section>

        {/* 지원 URL */}
        <section className="flex flex-col gap-2">
          <label>지원 URL</label>
          <input
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
            placeholder="지원한 사이트 주소를 입력해주세요."
            className="border border-[#DCDCDC] py-1 px-3 rounded-sm placeholder:text-black/25"
          />
        </section>

        {/* 기업 유형 */}
        <section className="flex flex-col gap-2">
          <label>기업 유형</label>
          <select
            value={companyScale}
            onChange={(e) => setCompanyScale(e.target.value)}
            className="border border-[#DCDCDC] py-1 px-3 rounded-sm"
          >
            <option value="" disabled>
              지원 상태를 선택해주세요
            </option>
            <option value="STARTUP">스타트업</option>
            <option value="SME">중소기업</option>
            <option value="LARGE">대기업</option>
            <option value="FOREIGN">외국계</option>
            <option value="PUBLIC">공기업</option>
          </select>
        </section>

        {/* 위치 */}
        <section className="flex flex-col gap-2">
          <label>위치</label>
          <input
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            placeholder="회사 위치를 작성해주세요."
            className="border border-[#DCDCDC] py-1 px-3 rounded-sm placeholder:text-black/25 w-full"
          />
        </section>
      </div>

      {/* 일정 등록 */}
      <h2 className="font-medium text-3xl mt-10">일정 등록</h2>

      <div className="mt-6 flex flex-row gap-4 w-3xl">
        {/* 지원일 */}
        <div className="flex flex-col w-full gap-2">
          <label>지원일</label>
          <DatePicker
            locale={ko}
            placeholderText="날짜를 선택해주세요."
            selected={applyDate}
            onChange={(date) => setApplyDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border border-[#DCDCDC] px-2 py-1 rounded-sm w-full"
          />
        </div>

        {/* 마감일 */}
        <div className="flex flex-col w-full gap-2">
          <label>마감일</label>
          <DatePicker
            locale={ko}
            placeholderText="날짜를 선택해주세요."
            selected={deadlineDate}
            onChange={(date) => setDeadlineDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border border-[#DCDCDC] px-2 py-1 rounded-sm w-full"
          />
        </div>
      </div>

      {/* 지원 상태 */}
      <h2 className="font-medium text-3xl mt-10">상태 및 문서</h2>

      <div className="mt-6 flex flex-col gap-2 w-96">
        <label>
          <span className="text-[#FF4D4F]">*</span>지원 상태
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ApplicationStatus)} // 타입 캐스팅
          className="border border-[#DCDCDC] px-2 py-1 rounded-sm text-black/75"
        >
          {Object.values(ApplicationStatus).map((s) => (
            <option key={s} value={s}>
              {s === ApplicationStatus.PLANNED
                ? "지원 예정"
                : s === ApplicationStatus.APPLIED
                ? "지원 완료"
                : s === ApplicationStatus.DOCUMENT_PASSED
                ? "서류 합격"
                : s === ApplicationStatus.FINAL_PASSED
                ? "최종 합격"
                : "불합격"}
            </option>
          ))}
        </select>
      </div>

      {/* 문서 선택 섹션 */}
      <h3 className="font-medium text-xl mt-10 mb-4">문서 선택</h3>
      <div className="flex flex-wrap gap-4">
        {isLoading && <p>문서를 불러오는 중...</p>}
        {isError && <p>문서를 불러오는 중에 오류가 발생했습니다.</p>}
        {!isLoading &&
          documents?.map(
            (document: {
              id: number;
              type: string;
              title: string;
              latestVersion: number;
            }) => {
              const isSelected = selectedDocuments.includes(document.id);
              return (
                <div
                  key={document.id}
                  onClick={() => toggleDocument(document.id)}
                  className={`px-4 py-5 border text-sm text-center flex flex-col justify-center items-center gap-3 rounded-sm cursor-pointer transition
                    ${
                      isSelected
                        ? "border-[#FF9016]"
                        : "border-[#D9D9D9]"
                    }`}
                >
                  <span className="flex flex-row items-center gap-1 text-[#212121]">
                    <FileIcon />
                    {document.title}
                  </span>
                  <span className="text-[#424242]">
                    {typeLabels[document.type] ?? document.type} V
                    {document.latestVersion}
                  </span>
                </div>
              );
            }
          )}
      </div>

      {/* 등록 버튼 */}
      <div className="mt-9 mb-8 w-full flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isUploadLoading}
          className="w-16 py-1 bg-main text-white rounded-sm"
        >
          {isUploadLoading ? "등록 중..." : "등록"}
        </button>
      </div>
    </div>
  );
}
