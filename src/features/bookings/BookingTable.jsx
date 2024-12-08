import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { isLoading, Bookings, count } = useBooking();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");

  let filterBooking = Bookings || [];
  if (filterValue === "checked-out") {
    filterBooking = filterBooking.filter(
      (book) => book.status === "checked-out"
    );
  }
  if (filterValue === "checked-in") {
    filterBooking = filterBooking.filter(
      (book) => book.status === "checked-in"
    );
  }
  if (filterValue === "unconfirmed") {
    filterBooking = filterBooking.filter(
      (book) => book.status === "unconfirmed"
    );
  }
  //SORT
  const sortBy = searchParams.get("Sortby") || "startDate-asc";
  const [value, direction] = sortBy.split("-");

  const middle = direction === "asc" ? 1 : -1;
  const sortBooking = filterBooking.sort(
    (a, b) => (a[value] - b[value]) * middle
  );

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortBooking}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
