"use client";

import { useState } from "react";

export default function DocumentTypeDropDown({
  type,
  setType,
}: {
  type: string;
  setType: (type: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const button_style = "border-b border-b-[#DCDCDC] py-1 rounded-xs";
  return (
    <>
      <button
        type="button"
        className="border py-2 rounded-xs border-[#DCDCDC]"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {type ? type : "문서 유형을 선택해주세요."}
      </button>

      {isOpen && (
        <div className="flex flex-col border mt-4">
          <button
            className={button_style}
            onClick={() => {
              setType("RESUME");
              setIsOpen(false);
            }}
          >
            이력서
          </button>
          <button
            className={button_style}
            onClick={() => {
              setType("COVER_LETTER");
              setIsOpen(false);
            }}
          >
            자기소개서
          </button>
          <button
            className={button_style}
            onClick={() => {
              setType("PORTFOLIO");
              setIsOpen(false);
            }}
          >
            포트폴리오
          </button>
        </div>
      )}
    </>
  );
}
