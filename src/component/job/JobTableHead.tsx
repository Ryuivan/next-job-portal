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
      <TableCell align="right">Description</TableCell>
      <TableCell align="right">Location</TableCell>
      <TableCell align="right">Salary</TableCell>
      <TableCell align="right">Category</TableCell>
      <TableCell align="right">Created At</TableCell>
      <TableCell align="right">Updated At</TableCell>
      <TableCell align="right">Action</TableCell>
    </TableRow>
  );
};

export default JobTableHead;
