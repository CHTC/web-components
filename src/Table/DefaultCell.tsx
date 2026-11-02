import { TableCell } from "@mui/material";
import { ReactNode } from "react";
import { CellComponentProps, TableData } from "./types";

/** The cell rendered for a column that has no CellComponent of its own */
const DefaultCell = <R extends TableData>({
  value,
}: CellComponentProps<R, keyof R>) => {
  return <TableCell>{value as ReactNode}</TableCell>;
};

export default DefaultCell;
