import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletecabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleteing, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("cabin  successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleteing, deleteCabin };
}
