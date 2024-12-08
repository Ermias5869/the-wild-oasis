import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
// import Uploader from "../data/Uploader";

const StylesSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  grid-row: 1/3;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
export default function SideBar() {
  return (
    <StylesSideBar>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </StylesSideBar>
  );
}
