import { createDocument, deleteDocument, getDocumentById, getDocuments, uploadDocument } from "@/lib/documents";
import { DocumentType } from "@/type/documentType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useDocuments = () => {
  return useQuery({
    queryKey: ["documents"], // 캐시 키
    queryFn: getDocuments, // 호출할 함수
  });
};

// 문서 상세 조회 훅
export const useDocument = (id: string) => {
  return useQuery({
    queryKey: ["documents", id], // 특정 문서 캐시 키
    queryFn: () => getDocumentById(id), // id 기반 조회
    enabled: !!id, // id 없으면 호출 안 함
  });
};

// 신규 문서 등록 훅
export const useCreateDocument = () => {
  const queryClient = useQueryClient(); // 캐시 무효화를 위해 사용
  return useMutation({
    mutationFn: createDocument, // 등록 요청
    onSuccess: () => {
      // 성공 시 문서 목록 캐시 무효화 → 자동 갱신
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};

// 새로운 버전 업로드 훅
export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, fileInfo }: { id: string; fileInfo: DocumentType }) =>
      uploadDocument(id, fileInfo),
    onSuccess: (_, variables) => {
      // 해당 문서 상세 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["documents", variables.id] });
    },
  });
};

// 문서 삭제 훅
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      // 삭제 후 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};
