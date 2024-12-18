import { Outlet } from "react-router";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;
const StyleLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
export default function AppLayout() {
  return (
    <StyleLayout>
      <Header />

      <SideBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyleLayout>
  );
}
