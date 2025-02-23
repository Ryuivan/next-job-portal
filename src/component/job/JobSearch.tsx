"use client";

import { Box, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const JobSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "32px",
      }}
    >
      <TextField
        fullWidth
        id="job-search"
        label="Search Jobs"
        type="text"
        variant="outlined"
        size="small"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </Box>
  );
};

export default JobSearch;
