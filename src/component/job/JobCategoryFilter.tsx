"use client";

import { Label } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

type JobCategoryFilterProps = {
  categories: string[];
};

const JobCategoryFilter = ({ categories }: JobCategoryFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newCategory = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category"); // Hapus jika "All Categories" dipilih
    }

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <FormControl
      sx={{
        width: "350px",
      }}
    >
      <InputLabel id="category-select">Category</InputLabel>
      <Select
        labelId="category-select"
        label="Categories"
        value={currentCategory}
        onChange={handleChange}
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default JobCategoryFilter;
