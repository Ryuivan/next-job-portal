import LoginForm from "@/component/login/LoginForm";
import { Container, Stack } from "@mui/material";

const LoginPage = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="80vh">
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </Stack>
  );
};

export default LoginPage;
