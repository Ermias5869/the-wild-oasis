import styled from "styled-components";
import PropTypes from "prop-types";
const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1.2rem 0;
  /* overflow: hidden; */
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
FormRowVertical.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

FormRowVertical.defaultProps = {
  label: "",
  error: "",
};
export default FormRowVertical;
