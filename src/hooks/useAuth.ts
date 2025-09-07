import { signUp, socialSignUp } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";

interface SocialSignUpPayload {
  email: string;
  nickname: string;
}

export const useSocialSignUp = () => {
  return useMutation({
    mutationFn: (payload: SocialSignUpPayload) =>
      socialSignUp(payload.email, payload.nickname),
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (payload: {
      email: string;
      password: string;
      nickname: string;
    }) => signUp(payload.email, payload.password, payload.nickname),
  });
};
