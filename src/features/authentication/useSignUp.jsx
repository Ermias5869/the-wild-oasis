import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuths";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useSignUp() {
  const navigation = useNavigate();
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signup({ email, password, fullName }),
    onSuccess: () => {
      toast.success("use sussefully signUp");
      navigation("/dashboard");
    },
  });
  return { signUp, isLoading };
}
