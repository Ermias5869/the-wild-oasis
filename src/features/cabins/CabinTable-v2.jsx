import styled from "styled-components";
import CabinRow from "./CabinRow";

import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";

const Table = styled.div`
  border: 1px solid #e5e7eb;

  font-size: 1.4rem;
  background-color: white;
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #4b5563;
  padding: 1.6rem 2.4rem;
`;

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />;
  return (
    <Table role="table">
      <TableHeader role="column">
        <dev></dev>
        <dev>caBIN</dev>
        <dev>CAPACITY</dev>
        <dev>PRICE</dev>
        <dev>Discount</dev>
        <dev></dev>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}
