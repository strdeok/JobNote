import { setUserAvatar } from "@/lib/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePatchUserAvatar = () => {
  const queryClient = useQueryClient(); 
  return useMutation({
    mutationFn: setUserAvatar, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};