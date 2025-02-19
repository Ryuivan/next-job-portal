import { Stack, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      color="secondary.main"
    >
      <Typography
        fontWeight={500}
        textAlign="left"
        fontSize="20px"
        noWrap
        sx={{}}
      >
        Job Portal
      </Typography>
    </Stack>
  );
};

export default Logo;
