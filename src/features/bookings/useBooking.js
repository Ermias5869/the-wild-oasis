import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/Counstant";

export function useBooking() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const sortByRow = searchParams.get("sortby") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");

  const filter = searchParams.get("status");

  const sortby = { field, direction };
  //paginaton
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    isLoading,
    // error,

    data,
  } = useQuery({
    queryKey: ["Bookings", filter, sortby, page],
    queryFn: () => getBookings({ sortby, page }),
  });
  const Bookings = data?.data || [];
  const count = data?.count || 0;
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["Bookings", filter, sortby, page + 1],
      queryFn: () => getBookings({ sortby, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["Bookings", filter, sortby, page - 1],
      queryFn: () => getBookings({ sortby, page: page - 11 }),
    });
  return { isLoading, Bookings, count };
}
