"use server";

import CreateJobForm from "@/component/job/CreateJobForm";
import FormContainer from "@/component/ui/form/FormContainer";

export const CreateJobPage = () => {
  return (
    <FormContainer>
      <CreateJobForm />
    </FormContainer>
  );
};

export default CreateJobPage;
