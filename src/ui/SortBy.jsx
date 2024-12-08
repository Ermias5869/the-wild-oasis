import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import PropTypes from "prop-types";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function onhandleChange(e) {
    searchParams.set("Sortby", e.target.value);
    setSearchParams(searchParams);
  }
  // const sortBy = searchParams.get("sortby") || "";
  // console.log(sortBy);

  return (
    <Select
      options={options}
      // value={sortBy}
      type="white"
      onChange={onhandleChange}
    />
  );
}
SortBy.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
