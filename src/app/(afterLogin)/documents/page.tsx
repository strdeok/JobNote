import PlusIcon from "@/assets/Plus.svg";
import VersionBadge from "./_components/versionBadge";
import UploadButton from "./_components/uploadButton";
import CompanyNameBadge from "./_components/companyNameBadge";
import Link from "next/link";
import Divider from "./_components/divider";


export default function DocumentsPage() {
  const documents = [
    {
      id: 0,
      type: "RESUME",
      title: "이력서",
      lastModifiedDate: "2025-08-21",
      version: "1",
      companyName: ["카카오", "네이버"],
    },
  ];

  const th_style = "relative text-center p-4 font-medium";
  const td_stytle = "text-center p-4";
  return (
    <>
      <h2 className="text-3xl font-medium mt-8">나의 문서 목록</h2>

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
          {documents.map((doc) => {
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
                  <VersionBadge>{doc.version}</VersionBadge>
                </td>
                <td>
                  <UploadButton />
                </td>
                <td className={td_stytle}>
                  <div className="flex flex-row gap-2 justify-center flex-wrap">
                    {doc.companyName.map((companyName) => {
                      return <CompanyNameBadge key={companyName}>{companyName}</CompanyNameBadge>;
                    })}
                  </div>
                </td>
                <td className={td_stytle}>{doc.lastModifiedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
