import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useState } from "react";
import Button from "../ui/Button";
import SignupForm from "../features/authentication/SignupForm";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h2">
        {isSignUp ? "Log in to your account" : "Sign up to new account"}
      </Heading>
      {isSignUp ? <LoginForm /> : <SignupForm />}
      <Button onClick={() => setIsSignUp((prv) => !prv)}>
        {isSignUp ? "New here? Sign up now and get started!" : "Back to Log in"}
      </Button>
    </LoginLayout>
  );
}

export default Login;
