import { usePatchUserAvatar } from "@/hooks/useUser";
import { uploadFile } from "@/lib/file";

export default function SetAvatarScreen() {
  const { mutate, isPending, error, isSuccess } = usePatchUserAvatar();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    // 파일 정보 객체
    const fileInfo = {
      fileName: file.name,
      contentType: file.type,
      fileSize: file.size,
    };

    try {
      const { fileUrl } = await uploadFile(file, fileInfo);

      mutate(fileUrl);
    } catch (err) {
      console.error(err);
    }
  };
  console.log("pending" + isPending);
  console.log("error" + error);
  console.log("isSuccess" + isSuccess);
  return (
    <div className="h-full p-8">
      <label htmlFor="avatar-file">
        <div className="w-full h-full border rounded-2xl flex items-center justify-center">
          {isPending ? (
            <span className="text-gray-500">업로드 중...</span>
          ) : isSuccess ? (
            <span className="text-green-500">업로드 성공!</span>
          ) : error ? (
            <span className="text-red-500">업로드 실패</span>
          ) : (
            <span className="text-gray-500">클릭해서 파일 업로드</span>
          )}
        </div>
      </label>
      <input id="avatar-file" type="file" hidden onChange={handleFileChange} />
    </div>
  );
}
