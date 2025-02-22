import { getJobByIdAction } from "@/app/lib/job/actions";
import UpdateJobForm from "@/component/job/UpdateJobForm";
import FormContainer from "@/component/ui/form/FormContainer";

type UpdateJobPageProps = {
  params: { id: string };
};

const updateJobPage = async ({ params }: UpdateJobPageProps) => {
  const { id } = params;

  const job = await getJobByIdAction(id);

  return (
    <FormContainer>
      <UpdateJobForm job={job.data ? job.data : undefined} />
    </FormContainer>
  );
};

export default updateJobPage;
