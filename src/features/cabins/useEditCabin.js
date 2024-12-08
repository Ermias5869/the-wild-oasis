import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditcabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isediting } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditcabin(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin successfully Edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editCabin, isediting };
}
