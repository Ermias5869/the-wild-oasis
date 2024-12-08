import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router";

export function useBookings() {
  const { BookingId } = useParams();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["Booking", BookingId],
    queryFn: () => getBooking(BookingId),
    retry: false,
  });

  return { booking, isLoading };
}
