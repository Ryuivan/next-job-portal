import RegisterForm from "@/component/register/RegisterForm";
import { Box, Container } from "@mui/material";

const RegisterPage = () => {
  return (
    <Box>
      <h1>Register</h1>
      <Container maxWidth="sm">
        <RegisterForm />
      </Container>
    </Box>
  );
};

export default RegisterPage;
