import { Box, Typography } from "@mui/material";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";

import SearchFilters, {
  FilterColumn,
  FilterValues,
  booleanFilter,
  dateRangeFilter,
  optionsFilter,
  rangeFilter,
  textFilter,
} from "../src/SearchFilters";

type Application = {
  status: string;
  role: string;
  active: boolean;
  cpus: number;
  memory: number;
  submitted: string;
  pi: string;
};

// Built once at module scope, the way a page defines its columns
const columnFilters: FilterColumn<Application>[] = [
  {
    id: "status",
    name: "Status",
    filter: optionsFilter([
      { value: "PENDING", label: "Pending" },
      { value: "APPROVED", label: "Approved" },
      { value: "DENIED", label: "Denied" },
      { value: "WITHDRAWN", label: "Withdrawn" },
    ]),
  },
  {
    id: "role",
    name: "Role",
    filter: optionsFilter([
      { value: "pi", label: "PI" },
      { value: "student", label: "Student" },
      { value: "postdoc", label: "Postdoc" },
      { value: "staff", label: "Staff" },
      { value: "faculty", label: "Faculty" },
      { value: "external", label: "External Collaborator" },
    ]),
  },
  { id: "active", name: "Active", filter: booleanFilter("Active", "Inactive") },
  { id: "submitted", name: "Submitted", filter: dateRangeFilter() },
  { id: "pi", name: "PI", filter: textFilter() },
  { id: "cpus", name: "CPUs", filter: rangeFilter({ min: 0, max: 10 }) },
  {
    id: "memory",
    name: "Memory (MB)",
    filter: rangeFilter({ min: 500, max: 1000, step: 50 }),
  },
];

/** SearchFilters is controlled: this holds the value the way ServerTable would, and shows it. */
const ControlledSearchFilters = ({
  initialValue = {},
}: {
  initialValue?: FilterValues;
}) => {
  const [value, setValue] = useState<FilterValues>(initialValue);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <SearchFilters
        columnFilters={columnFilters}
        value={value}
        onChange={setValue}
      />
      <Typography
        component="pre"
        variant="body2"
        sx={{ fontFamily: "monospace" }}
      >
        {JSON.stringify(value, null, 2)}
      </Typography>
    </Box>
  );
};

const meta: Meta<typeof ControlledSearchFilters> = {
  title: "Components/SearchFilters",
  component: ControlledSearchFilters,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithInitialFilters: Story = {
  args: {
    initialValue: {
      status: "APPROVED",
      memory: [600, 900],
      submitted: { from: "2026-10-01" },
    },
  },
};
