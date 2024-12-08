import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import PropTypes from "prop-types";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModel }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModel}
        >
          Cancel
        </Button>
        <Button
          variation="danger"
          disabled={disabled}
          onClick={() => onConfirm?.()}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}
ConfirmDelete.propTypes = {
  resourceName: PropTypes.string.isRequired, // Must be a string, required
  onConfirm: PropTypes.func.isRequired, // Must be a function, required
  disabled: PropTypes.bool, // Optional boolean
  onCloseModel: PropTypes.func,
};

ConfirmDelete.defaultProps = {
  disabled: false, // Default value for `disabled`
};

export default ConfirmDelete;