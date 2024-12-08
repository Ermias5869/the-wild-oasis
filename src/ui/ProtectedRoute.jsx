import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router";
const FullPage = styled.div`
  height: 100vh;
  background-color: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function ProtectedRoute({ children }) {
  const navigation = useNavigate();
  //1
  const { isLoading, isAuthenticated } = useUser();

  //3 only navigation use function or useEffect
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigation("/login");
      }
    },
    [isAuthenticated, isLoading, navigation]
  );
  //2
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );
  //4
  if (isAuthenticated) return children;
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
