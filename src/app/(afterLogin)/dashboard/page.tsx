"use client";

import { useFetchAllApplications } from "@/hooks/useApplications";
import { useEffect, useState } from "react";
import { CompanyApplication, Schedule } from "@/type/applicationType";
import { useSchedule } from "@/hooks/useSchedule";
import CalendarIcon from "@/assets/CalendarCheck.svg";
import LoadingSpinner from "@/app/_components/loadingSpinner";

export default function DashboardPage() {
  const [applicationStatus, setApplicationStatus] = useState<{
    APPLIED: number;
    DOCUMENT_PASSED: number;
    FINAL_PASSED: number;
    REJECTED: number;
  }>({
    APPLIED: 0,
    DOCUMENT_PASSED: 0,
    FINAL_PASSED: 0,
    REJECTED: 0,
  });

  function formatDateToApiString(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  const startDate = formatDateToApiString(new Date());
  const endDate = formatDateToApiString(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );

  const { data, isLoading } = useFetchAllApplications(0, "");
  const { data: scheduleData, isLoading: scheduleLoading } = useSchedule(
    startDate,
    endDate
  );

  const applications = data?.data.content as Array<CompanyApplication>;

  const statusCount = () => {
    if (!applications) return;

    const counts = {
      APPLIED: 0,
      DOCUMENT_PASSED: 0,
      FINAL_PASSED: 0,
      REJECTED: 0,
    };

    applications.forEach((app) => {
      if (app.status === "APPLIED") counts.APPLIED += 1;
      else if (app.status === "DOCUMENT_PASSED") counts.DOCUMENT_PASSED += 1;
      else if (app.status === "FINAL_PASSED") counts.FINAL_PASSED += 1;
      else if (app.status === "REJECTED") counts.REJECTED += 1;
    });

    setApplicationStatus(counts);
  };

  useEffect(() => {
    statusCount();
  }, [applications]);

  if (isLoading || scheduleLoading) return <LoadingSpinner />;

  const box_style = "w-60 border rounded-sm px-9 py-5 flex flex-col gap-4";
  return (
    <>
      <section className="relative top-10 flex flex-row gap-6">
        <div
          className={`${box_style} ${
            applicationStatus.APPLIED
              ? "border-[#FF9016] font-semibold"
              : "border-[#E0E0E0] text-[#696F8C]"
          }`}
        >
          <span className="w-full text-left">지원 회사</span>
          <span className="w-full text-right">
            {applicationStatus.APPLIED}개
          </span>
        </div>
        <div
          className={`${box_style} ${
            applicationStatus.DOCUMENT_PASSED
              ? "border-[#FF9016] font-semibold"
              : "border-[#E0E0E0] text-[#696F8C]"
          }`}
        >
          <span className="w-full text-left">서류 합격</span>
          <span className="w-full text-right">
            {applicationStatus.DOCUMENT_PASSED}개
          </span>
        </div>
        <div
          className={`${box_style} ${
            applicationStatus.REJECTED
              ? "border-[#FF9016] font-semibold"
              : "border-[#E0E0E0] text-[#696F8C]"
          }`}
        >
          <span className="w-full text-left">불합격</span>
          <span className="w-full text-right">
            {applicationStatus.REJECTED}개
          </span>
        </div>
        <div
          className={`${box_style} ${
            applicationStatus.FINAL_PASSED
              ? "border-[#FF9016] font-semibold"
              : "border-[#E0E0E0] text-[#696F8C]"
          }`}
        >
          <span className="w-full text-left">최종 합격</span>
          <span className="w-full text-right">
            {applicationStatus.FINAL_PASSED}개
          </span>
        </div>
      </section>

      <section className="relative top-28 flex flex-col">
        <h2 className="text-3xl font-semibold mb-6">다가오는 일정</h2>

        <div className="flex flex-col gap-4">
          {scheduleData?.data.content.map((schedule: Schedule) => (
            <div
              key={schedule.id}
              className="w-full border border-[#E7E7E7] rounded-lg px-5 py-3.5 text-xl font-medium"
            >
              <span className="flex flex-row gap-2 items-center">
                <CalendarIcon />
                {schedule.title}
                <div className="text-xs text-main bg-[#FFF2E3] px-2 rounded-full">
                  D-7
                </div>
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
