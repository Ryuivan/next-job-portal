import RegisterForm from "@/component/ui/register/RegisterForm";
import { Container } from "@mui/material";

const RegisterPage = () => {
  return (
    <div>
      <h1>Register</h1>
      <Container maxWidth="sm">
        <RegisterForm />
      </Container>
    </div>
  );
};

export default RegisterPage;
