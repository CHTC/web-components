import { TableCell } from "@mui/material";
import { useState } from "react";
import Table, {
  CellComponentProps,
  ColumnConfig,
  DEFAULT_PAGE_SIZE,
  SortState,
  TableProps,
} from "../src/Table";
import { Organization, organizations } from "./mockData/Table";

import type { Meta, StoryObj } from "@storybook/nextjs";

const NumberCell = ({ value }: CellComponentProps<Organization, keyof Organization>) => (
  <TableCell align="right">{Number(value).toLocaleString()}</TableCell>
);

const numberSort = (a: unknown, b: unknown) => Number(a) - Number(b);
const stringSort = (a: unknown, b: unknown) => String(a).localeCompare(String(b));

const columns: ColumnConfig<Organization>[] = [
  { id: "organization", name: "Organization", sort: stringSort },
  { id: "jobsRan", name: "Jobs Ran", sort: numberSort, CellComponent: NumberCell },
  { id: "fieldsOfScience", name: "Impacted Fields of Science", sort: numberSort },
  { id: "researchProjects", name: "Impacted Research Projects", sort: numberSort },
];

/**
 * Table is controlled: the caller owns the sort and page and passes in the rows to show.
 * This holds that state and sorts and pages the mock rows in memory, the way a table shell would.
 */
const ControlledTable = ({
  data,
  sortable,
  paginated,
}: {
  data: Organization[];
  sortable?: boolean;
  paginated?: boolean;
}) => {
  const [sort, setSort] = useState<SortState<keyof Organization & string>>();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const sortColumn = columns.find((column) => column.id === sort?.columnId);
  const sorted =
    sort && sortColumn?.sort
      ? [...data].sort((a, b) => {
          const result = sortColumn.sort!(a[sort.columnId], b[sort.columnId]);
          return sort.direction === "asc" ? result : -result;
        })
      : data;
  const rows = paginated ? sorted.slice(page * pageSize, (page + 1) * pageSize) : sorted;

  const props: TableProps<Organization> = {
    data: rows,
    columns: sortable
      ? columns.map((column) => ({
          ...column,
          onSort: (next: SortState) => {
            setSort(next as SortState<keyof Organization & string>);
            setPage(0);
          },
        }))
      : columns.map(({ sort: _sort, ...column }) => column),
    sort,
    pagination: paginated
      ? {
          totalCount: data.length,
          page,
          pageSize,
          onPageChange: setPage,
          onPageSizeChange: (size) => {
            setPageSize(size);
            setPage(0);
          },
        }
      : undefined,
  };

  return <Table {...props} />;
};

const meta: Meta<typeof ControlledTable> = {
  title: "Components/Data/Table",
  component: ControlledTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    data: organizations,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sortable: Story = {
  args: { sortable: true },
};

export const Paginated: Story = {
  args: { paginated: true },
};

export const SortableAndPaginated: Story = {
  args: { sortable: true, paginated: true },
};

export const Empty: Story = {
  args: { data: [] },
};
