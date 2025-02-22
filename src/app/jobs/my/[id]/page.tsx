import { getMyJobPostsAction } from "@/app/lib/job/actions";
import JobTableBodyContent from "@/component/job/JobTableBodyContent";
import JobTableHead from "@/component/job/JobTableHead";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";

type JobDetailPageProps = {
  params: { id: string };
};

const MyJobPostPage = async ({ params }: JobDetailPageProps) => {
  const { id } = params;

  const myJobPost = await getMyJobPostsAction(id);

  return (
    <TableContainer component={Paper}>
      <Table width="100%">
        <TableHead>
          <JobTableHead />
        </TableHead>

        <TableBody>
          <JobTableBodyContent myJobPost={myJobPost.data} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyJobPostPage;
