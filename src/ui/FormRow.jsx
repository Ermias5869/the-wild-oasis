import styled from "styled-components";
import Error from "./Error";
import PropTypes from "prop-types";
const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 12rem;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const Label = styled.label`
  font-weight: 500;
`;
export default function FormRow({ Lable, error, children }) {
  return (
    <FormRow2>
      <Label htmlFor={children?.props?.id}>{Lable}</Label>
      {children}

      {error && <Error>{error}</Error>}
    </FormRow2>
  );
}
FormRow.propTypes = {
  Lable: PropTypes.string.isRequired, // Lable is a required string
  error: PropTypes.string, // error is an optional string
  children: PropTypes.element.isRequired, // children must be a single React element
};
