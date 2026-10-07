import { Box, SxProps } from "@mui/material";
import Table from "../src/Table";
import { defaultTableData } from "./mockData/Table";

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Table> = {
  title: "Components/Data/Table",
  component: (args) => {
    return <Table {...args} />;
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: defaultTableData,
};

export const Sortable: Story = {
  args: {
    sortable: true,
    defaultSortDirection: "desc",
    defaultSortColumn: "Jobs Ran",
    ...defaultTableData,
  },
};

export const Checkered: Story = {
  args: {
    bodyRowSx: {
      "&:nth-of-type(odd)": {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      },
    },
    ...defaultTableData,
  },
};

export const WithLinkCells: Story = {
  args: {
    sortable: true,
    defaultSortDirection: "desc",
    defaultSortColumn: "Jobs Ran",
    cellRenderer: (cell, _header, column, _row) => {
      if (column === 0) {
        return <a href={`https://www.google.com/search?q=${cell}`}>{cell}</a>;
      }
      return <>{cell.toLocaleString()}</>;
    },
    ...defaultTableData,
  },
};

export const WithHeight: Story = {
  args: {
    containerSx: {
      height: 400,
    },
    ...defaultTableData,
  },
};

export const IndividualCellBorders: Story = {
  args: {
    bodyCellSx: {
      border: {
        "&:first-child": {
          borderLeft: "1px solid rgba(224, 224, 224, 1)",
        },
        "&:last-child": {
          borderRight: "1px solid rgba(224, 224, 224, 1)",
        },
        "&:not(:last-child)": {
          borderRight: "1px solid rgba(224, 224, 224, 1)",
        },
      },
    },
    ...defaultTableData,
  },
};

export const Empty: Story = {
  args: {
    headers: ["Column 1", "Column 2", "Column 3", "Column 4"],
    data: [],
  },
};

export const Pagination: Story = {
  args: {
    sortable: true,
    defaultSortDirection: "desc",
    defaultSortColumn: "Jobs Ran",
    containerSx: {
      width: 1000,
    },
    pagination: true,
    pageSize: 10,
    ...defaultTableData,
  },
};

export const PaginationWithHeight: Story = {
  args: {
    sortable: true,
    defaultSortDirection: "desc",
    defaultSortColumn: "Jobs Ran",
    containerSx: {
      width: 1000,
      height: 300,
    },
    pagination: true,
    pageSize: 10,
    ...defaultTableData,
  },
};

export const PaginationWithCustomizableRows: Story = {
  args: {
    sortable: true,
    defaultSortDirection: "desc",
    defaultSortColumn: "Jobs Ran",
    containerSx: {
      width: 1000,
    },
    pagination: true,
    pageSize: 10,
    rowsPerPageOptions: [5, 10, 25, 50],
    ...defaultTableData,
  },
};

export const PaginationWithSkipButtons: Story = {
  args: {
    showSkipButtons: true,
    ...Pagination.args,
  },
};

const thinBorder = "1px solid rgb(138, 138, 138, 0.2)";
const thickBorder = "1px solid rgb(0, 0, 0)";

export const Styled: Story = {
  args: {
    sortable: true,
    defaultSortDirection: "desc",
    defaultSortColumn: "Jobs Ran",
    headCellSx: {
      ...borderHelper(thinBorder, thinBorder, "0.5rem"),
      bgcolor: "#f5f5f5",
      borderTop: thinBorder,
      borderBottom: thickBorder,
      fontWeight: "bold",
    },
    footerCellSx: {
      bgcolor: "#f5f5f5",
      borderTop: thickBorder,
      borderBottom: thickBorder,
      ...borderHelper(thinBorder, thinBorder, "", "0.5rem"),
      fontWeight: "bold",
    },
    bodyCellSx: {
      borderBottom: thinBorder,
      ...borderHelper(thinBorder, thinBorder),
    },
    footerData: [
      <Box display="flex" justifyContent="space-between">
        <span>Summary Statistics:</span>
        <span>73</span>
      </Box>,
      218_807_151,
      57,
      196,
    ],
    headers: defaultTableData.headers,
    data: defaultTableData.data,
  },
};

function borderHelper(
  outer: string,
  inner: string,
  radiusTop?: string,
  radiusBottom?: string
): SxProps {
  return {
    borderTop: inner,
    borderBottom: inner,
    "&:first-child": {
      borderLeft: outer,
      borderTopLeftRadius: radiusTop,
      borderBottomLeftRadius: radiusBottom,
    },
    "&:last-child": {
      borderRight: outer,
      borderTopRightRadius: radiusTop,
      borderBottomRightRadius: radiusBottom,
    },
    "&:not(:last-child)": {
      borderRight: inner,
    },
  };
}

export const StyledWithHeight: Story = {
  args: {
    ...Styled.args,
    containerSx: {
      height: 400,
    },
  },
};
