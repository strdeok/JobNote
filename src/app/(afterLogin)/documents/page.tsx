"use client";

import PlusIcon from "@/assets/Plus.svg";
import VersionBadge from "./_components/versionBadge";
import UploadButton from "./_components/uploadButton";
import CompanyNameBadge from "./_components/companyNameBadge";
import Link from "next/link";
import Divider from "./_components/divider";
import { useDocuments } from "@/hooks/useDocuments";
import LoadingSpinner from "@/app/_components/loadingSpinner";

interface DocumentType {
  id: number;
  type: string;
  title: string;
  lastModifiedDate: string;
  applicationForms: {
    id: string;
    companyName: string;
    companyAddress: string;
    status: string;
  }[];
}

export default function DocumentsPage() {
  const { data, error, isLoading } = useDocuments();

  const documents = data?.data?.data?.documents ?? [];

  const th_style = "relative text-center p-4 font-medium";
  const td_stytle = "text-center p-4";
  return (
    <>
      <div className="flex flex-row justify-between items-center mt-8">
        <h2 className="text-3xl font-medium">나의 문서 목록</h2>
        <Link
          href="/documents/new"
          className="bg-main rounded-xs text-white py-2 px-4"
        >
          문서 등록
        </Link>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
      {error && (
        <div>
          에러가 발생하였습니다. <br /> 잠시 후 시도해주세요.
        </div>
      )}
      {data && (
        <table className="table-fixed w-full border-collapse mt-4">
          <thead>
            <tr className="border-b border-b-black/5 bg-[#FAFAFA]">
              <th className="w-12">
                <Divider />
              </th>
              <th className={th_style}>
                문서명 <Divider />
              </th>
              <th className={th_style}>
                Version <Divider />
              </th>
              <th className={th_style}>
                올리기 <Divider />
              </th>
              <th className={th_style}>
                회사명 <Divider />
              </th>
              <th className={th_style}>최종수정날짜</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc: DocumentType) => {
              return (
                <tr key={doc.id} className="border-b border-b-black/5">
                  <td className={td_stytle}>
                    <button className="p-0.5 border border-[#D9D9D9] flex justify-center items-center rounded-xs">
                      <PlusIcon />
                    </button>
                  </td>
                  <td className={td_stytle}>
                    <Link href={`/documents/${doc.id}`}>{doc.title}</Link>
                  </td>
                  <td className={td_stytle}>
                    <VersionBadge>V1</VersionBadge>
                  </td>
                  <td>
                    <UploadButton />
                  </td>
                  <td className={td_stytle}>
                    <div className="flex flex-row gap-2 justify-center flex-wrap">
                      {doc.applicationForms.map((history) => {
                        return (
                          <CompanyNameBadge key={history.companyName}>
                            {history.companyName}
                          </CompanyNameBadge>
                        );
                      })}
                    </div>
                  </td>
                  <td className={td_stytle}>{doc.lastModifiedDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
