export enum ApplicationStatus {
  PLANNED = "PLANNED",
  APPLIED = "APPLIED",
  DOCUMENT_PASSED = "DOCUMENT_PASSED",
  FINAL_PASSED = "FINAL_PASSED",
  REJECTED = "REJECTED",
}

export enum ScheduleStatus {
  PLANNED = "PLANNED",
  PROGRESS = "PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export const typeLabels: Record<string, string> = {
  RESUME: "이력서",
  COVER_LETTER: "자기소개서",
  PORTFOLIO: "포트폴리오",
};

export interface Document {
  id: number;
  title?: string;
  type?: string;
}

export interface Schedule {
  id: number;
  title: string;
  memo?: string;
  dateTime: string;
  status: ScheduleStatus;
}

export interface CompanyApplication {
  companyName: string;
  companyTel?: string;
  companyAddress?: string;
  companyUrl?: string;
  companyEmail?: string;
  companyScale?: string;
  position?: string;
  memo?: string;
  status: ApplicationStatus;
  schedules?: Schedule[];
  documents?: Document[];
}

export interface CompanyApplicationWithId extends CompanyApplication {
  id: number;
}
