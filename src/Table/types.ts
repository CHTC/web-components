import React from "react";

export interface SortState<K extends string = string> {
  columnId: K;
  direction: "asc" | "desc";
}

/** What every column shares, whether it's shown in Table or listed in SearchFilters. */
export interface BaseColumn<R extends TableData> {
  id: keyof R & string;
  name: string;
}

/** A column Table can render, with no sorting. */
export interface DisplayColumn<R extends TableData> extends BaseColumn<R> {
  value?: (r: R) => R[keyof R];
  CellComponent?: React.FC<CellComponentProps<R, keyof R>>;
}

/** A Table column, optionally sortable. */
export interface ColumnConfig<R extends TableData> extends DisplayColumn<R> {
  sort?: (a: R[keyof R], b: R[keyof R]) => number;
  onSort?: ({ columnId, direction }: SortState) => void;
}

export interface ActionConfig<R extends TableData> {
  id: string;
  name: string;
  value?: (r: R) => R[keyof R];
  onClick?: (r: R) => void;
  CellComponent?: React.FC<CellComponentProps<R, keyof R>>;
}

export type CellComponentProps<R extends TableData, K extends keyof R> = {
  row: R;
  value: R[K];
};

export type TableData = object;
