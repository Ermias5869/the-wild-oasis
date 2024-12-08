import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuths";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
export function useLogin() {
  const qureryClient = useQueryClient();
  const navigation = useNavigate();
  const { mutate: logining, isLoading: islogining } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      qureryClient.setQueryData(["user"], user.user);
      navigation("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("error", err);
      toast.error("Provide email or password are incorrect");
    },
  });
  return { logining, islogining };
}
