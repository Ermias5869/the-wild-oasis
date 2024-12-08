import styled from "styled-components";
import PropTypes from "prop-types";
const Err = styled.div`
  padding: 10px 2px;
  background-color: var(--color-red-100);
  color: var(--color-red-700);
  font-size: 8px;
  max-width: 100px;
  margin-right: -5;
  border-radius: 10%;
`;

export default function Error({ children }) {
  return <Err>{children}</Err>;
}
Error.propTypes = {
  children: PropTypes.node.isRequired, // Ensures that children (error message) is provided
};
