import { Box, Typography } from "@mui/material";

const FormTitle = ({ title }: { title: string }) => {
  return (
    <Box
      sx={{
        marginBottom: "16px",
      }}
    >
      <Typography fontSize="24px" color="primary" fontWeight={600}>
        {title}
      </Typography>
    </Box>
  );
};

export default FormTitle;
