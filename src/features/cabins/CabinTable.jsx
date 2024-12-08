import CabinRow from "./CabinRow";

import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";

  let Cabins = cabins || [];

  if (filterValue === "no-discount") {
    Cabins = Cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    Cabins = Cabins.filter((cabin) => cabin.discount > 0);
  }
  // Sort Table
  const sortBy = searchParams.get("Sortby") || "name-asc";
  const [field, direction] = sortBy.split("-");
  console.log(field, direction);
  const middle = direction === "asc" ? 1 : -1;
  const sortCabins = Cabins.sort((a, b) => (a[field] - b[field]) * middle);

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <dev></dev>
          <dev>caBIN</dev>
          <dev>CAPACITY</dev>
          <dev>PRICE</dev>
          <dev>Discount</dev>
          <dev></dev>
        </Table.Header>
        <Table.Body
          data={sortCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
