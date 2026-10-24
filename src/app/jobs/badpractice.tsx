import { getJobs } from "@/lib/db";

export default async function Page() {
  const jobs = await getJobs();

  return (
    <main>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
    </main>
  );
}
