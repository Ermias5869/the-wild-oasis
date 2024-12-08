import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
  font-size: 1rem;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

function DataItem({ icon, label, children }) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}
DataItem.propTypes = {
  icon: PropTypes.element.isRequired, // A React element for the icon
  label: PropTypes.string.isRequired, // The label must be a string
  children: PropTypes.node, // Any renderable content (optional)
};

export default DataItem;
