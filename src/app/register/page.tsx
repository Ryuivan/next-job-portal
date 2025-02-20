import RegisterForm from "@/component/register/RegisterForm";
import { Container, Stack } from "@mui/material";

const RegisterPage = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="80vh">
      <Container maxWidth="sm">
        <RegisterForm />
      </Container>
    </Stack>
  );
};

export default RegisterPage;
