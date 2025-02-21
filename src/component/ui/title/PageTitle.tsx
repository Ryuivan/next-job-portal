import { Box, Typography } from "@mui/material";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <Box
      sx={{
        marginTop: "16px",
        marginBottom: "32px",
      }}
    >
      <Typography
        fontSize="32px"
        color="text.primary"
        textAlign="center"
        fontWeight={600}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageTitle;
