"use client";

import React, { useState, useEffect, useRef } from "react";

const cardData = [
  {
    title: "이력서 관리",
    description: (
      <p>
        이력서, 자소서, 포트폴리오를{" "}
        <span className="text-main">버전별로 관리</span>하고 쉽게 찾아보세요
      </p>
    ),
  },
  {
    title: "지원 현황 관리",
    description: (
      <p>
        지원한 회사와 직무를 <span className="text-main">체계적으로 관리</span>
        하고 진행 상황을 추적하세요
      </p>
    ),
  },
  {
    title: "일정 관리",
    description: (
      <p>
        면접 일정과 서류 마감일을{" "}
        <span className="text-main">캘린더로 관리</span>하여 놓치지 마세요
      </p>
    ),
  },
];

export default function AnimatedCardStackResponsive() {
  const [visibleCards, setVisibleCards] = useState(0);

  // START! & 최종합격 참조
  const startRef = useRef<HTMLParagraphElement>(null);
  const finalRef = useRef<HTMLParagraphElement>(null);

  const [lineStyle, setLineStyle] = useState<{ top: number; height: number }>({
    top: 0,
    height: 0,
  });

  // 최종 목표 height 저장
  const [finalHeight, setFinalHeight] = useState(0);

  // 카드 순서대로 등장
  useEffect(() => {
    if (visibleCards < cardData.length) {
      const timer = setTimeout(() => setVisibleCards((prev) => prev + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [visibleCards]);

  // 최종 height 계산 (최종합격까지 거리)
  useEffect(() => {
    const startEl = startRef.current;
    const finalEl = finalRef.current;

    if (!startEl || !finalEl) return;

    const top = startEl.offsetTop + startEl.offsetHeight;
    const height = finalEl.offsetTop - top;

    if (height > 0) {
      setLineStyle((prev) => ({ ...prev, top })); // top은 그대로
      setFinalHeight(height); // 목표 높이만 따로 저장
    }
  }, []); // 최초 1번만 계산

  // ✅ 카드가 등장할 때마다 height 증가
  useEffect(() => {
    if (finalHeight === 0) return;

    // visibleCards 비율로 height 계산 (카드 등장 단계별로 선 길이 증가)
    const progress = visibleCards / cardData.length; // 0~1
    const newHeight = Math.min(progress * finalHeight, finalHeight);

    setLineStyle((prev) => ({
      ...prev,
      height: newHeight,
    }));
  }, [visibleCards, finalHeight]);

  return (
    <div className="flex flex-col min-h-full items-center justify-between py-[clamp(1rem,4vh,3rem)] w-3/5 bg-[#FFE8CC] relative overflow-hidden">
      {/* 배경 */}
      <div
        className="absolute w-full max-w-5xl left-1/2 -translate-x-1/2 bg-[#FFF4E1] rounded-b-full -top-36"
        style={{ aspectRatio: "2 / 1" }}
      />

      {/* 헤더 */}
      <div className="z-10 flex flex-col items-center mb-[clamp(1rem,5vh,3rem)] text-center">
        <h1 className="text-[clamp(1.5rem,4vw,3rem)] font-bold text-main mb-4">
          Jobnote
        </h1>
        <p className="text-gray-700 text-[clamp(0.9rem,2vw,1.25rem)] mb-[clamp(1rem,4vh,3rem)]">
          Jobnote 와 함께 합격까지 가볼까요?
        </p>
        {/* ✅ START! */}
        <p
          ref={startRef}
          className="text-main font-bold text-[clamp(1.2rem,2.5vw,2rem)] mb-8"
        >
          START!
        </p>
      </div>

      {/* ✅ 세로선 */}
      <div
        className="absolute left-1/2 w-px bg-[#9E9E9E] transition-all duration-700 -translate-x-1/2"
        style={{
          top: lineStyle.top,
          height: lineStyle.height,
          opacity: lineStyle.height > 0 ? 1 : 0,
        }}
      ></div>

      {/* 카드 */}
      <div className="relative z-10 flex flex-1 flex-col items-center w-full px-4">
        <div className="relative flex flex-col flex-1 justify-around items-center space-y-[clamp(1rem,5vh,3rem)] w-full max-w-3xl">
          {cardData.map((card, index) => (
            <div key={index} className="relative w-full">
              <div
                className={`relative w-full p-[clamp(0.75rem,2vw,1.5rem)] flex justify-center items-center bg-white rounded-lg shadow-md transition-all duration-700 ease-out
                  ${
                    index < visibleCards
                      ? "translate-y-0 opacity-100"
                      : "translate-y-20 opacity-0"
                  }`}
                style={{ transitionDelay: `${index * 0.3}s` }}
              >
                <div className="absolute left-6 top-0 -translate-y-1/2 px-[clamp(0.5rem,2vw,1rem)] py-[clamp(0.2rem,1vh,0.5rem)] bg-main rounded-full flex items-center justify-center text-white font-semibold text-[clamp(0.7rem,1.5vw,0.9rem)] shadow-md">
                  {card.title}
                </div>
                <p className="text-gray-800 text-[clamp(0.9rem,2vw,1.25rem)]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 최종합격 */}
      <p
        ref={finalRef}
        className={`text-main font-semibold text-[clamp(1.2rem,2.5vw,2rem)] mt-6 transition-opacity duration-700 ${
          visibleCards === cardData.length ? "opacity-100" : "opacity-0"
        }`}
      >
        최종합격
      </p>
    </div>
  );
}
