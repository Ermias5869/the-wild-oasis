import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBook, isLoading: isdeleteBooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Booking Succefully delete");
      queryClient.invalidateQueries({
        queryKey: ["Bookings"],
      });
    },
    onError: () => {
      toast.error("can not delete Booking");
    },
  });
  return { deleteBook, isdeleteBooking };
}
