export interface DocumentType {
  title: string;
  fileName: string;
  fileKey: string;
  fileType: string;
  fileSize: number;
  fileUrl?: string;
  version?: number;
  createdDate: string;
}
export interface DocumentTypeWithId {
  id: number;
  type: string;
  title: string;
  lastModifiedDate: string;
  latestVersion: number;
  applicationForms: {
    id: string;
    companyName: string;
    companyAddress: string;
    status: string;
  }[];
}
