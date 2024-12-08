import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuths";
import { useNavigate } from "react-router";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.removeQueries();
      navigation("/login", { replace: true });
    },
  });
  return { logout, isLoading };
}
