import LoginForm from "@/component/login/LoginForm";
import { Box, Container } from "@mui/material";

const LoginPage = () => {
  return (
    <Box>
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </Box>
  )
}

export default LoginPage;