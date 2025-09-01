import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/lib/file";

export const useUploadFile = () => {
  return useMutation({
    mutationFn: ({
      file,
      fileInfo,
    }: {
      file: File;
      fileInfo: { fileName: string; contentType: string; fileSize: number };
    }) => uploadFile(file, fileInfo),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
