import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/lib/auth";
import { resetPassword, withdraw } from "@/lib/users";
import { setNickName } from "@/lib/users";
import { setUserAvatar } from "@/lib/users";

// 유저 정보 가져오기
export const useUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

// 비밀번호 재설정
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (newPassword: string) => resetPassword(newPassword),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// 닉네임 변경
export const useNickname = () => {
  return useMutation({
    mutationFn: (nickname: string) => setNickName(nickname),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// 아바타 변경
export const usePatchUserAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setUserAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};


// 회원탈퇴
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: withdraw,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
