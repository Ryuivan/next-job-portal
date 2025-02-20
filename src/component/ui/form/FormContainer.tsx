import { Container, Stack } from "@mui/material";
import { ReactNode } from "react";

const FormContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Stack justifyContent="center" alignItems="center" height="80vh">
      <Container maxWidth="sm">{children}</Container>
    </Stack>
  );
};

export default FormContainer;
