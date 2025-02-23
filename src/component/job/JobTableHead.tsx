import { TableCell, TableRow } from "@mui/material";

const JobTableHead = () => {
  return (
    <TableRow
      sx={{
        fontWeight: "600",
        fontSize: "22px",
      }}
    >
      <TableCell>Title</TableCell>
      <TableCell align="center">Description</TableCell>
      <TableCell align="center">Location</TableCell>
      <TableCell align="center">Salary</TableCell>
      <TableCell align="center">Category</TableCell>
      <TableCell align="center">Created At</TableCell>
      <TableCell align="center">Updated At</TableCell>
      <TableCell align="center">Action</TableCell>
    </TableRow>
  );
};

export default JobTableHead;
