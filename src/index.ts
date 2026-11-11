// Content: components, data types, and GitHub-backed getters per domain.
export * from "./Article";
export * from "./Event";
export * from "./Presentation";
export * from "./Staff";
export * from "./Release";
export * from "./Security";
export * from "./Milestone";

// Shared GitHub client the getters are built on.
export {
  githubFetch,
  GITHUB_REVALIDATE,
  getTree,
  getRepoPaths,
  getRawFile,
  getAllPages,
  type GitHubFetchOptions,
  type GitTree,
  type GitTreeItem,
} from "./github";

export { default as MarkdownContent } from "./markdownComponents/MarkdownContent";
export {
  default as markdownComponents,
  createMarkdownComponents,
  type MarkdownComponentOptions,
} from "./markdownComponents/markdownComponents";
export { default as excerptComponents, linkedCardExcerptComponents, createExcerptComponents } from "./markdownComponents/excerptComponents";

// Standalone components.
export { default as BigNumber, type BigNumberProps } from "./BigNumber";
export { default as PieChart, type PieChartData } from "./PieChart";
export { default as ColorBar } from "./ColorBar";
export { default as ConfirmButton } from "./ConfirmButton";
export {
  default as SearchFilters,
  DEFAULT_FILTER_ROW_HEIGHT,
  optionsFilter,
  booleanFilter,
  rangeFilter,
  dateRangeFilter,
  textFilter,
  numberFilter,
  isDateRange,
  DateRangeFilterInput,
  OptionsFilterInput,
  RadioFilterInput,
  RangeFilterInput,
  TextFilterInput,
  type SearchFiltersProps,
  type DateRangeFilterInputProps,
  type OptionsFilterInputProps,
  type RadioFilterInputProps,
  type RangeFilterInputProps,
  type TextFilterInputProps,
  type FilterInputProps,
  type FilterDef,
  type FilterKind,
  type FilterColumn,
  type FilterValues,
  type FilterOption,
  type DateRange,
} from "./SearchFilters";
export {
  default as Table,
  DefaultCell,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_OPTIONS,
  type TableProps,
  type BaseColumn,
  type DisplayColumn,
  type ColumnConfig,
  type ActionConfig,
  type CellComponentProps,
  type SortState,
  type TableData,
} from "./Table";
export { default as TimeBar } from "./TimeBar";
export * from "./TimeBar";
export { default as TopStyledBlock } from "./TopStyledBlock";
export * from "./UW";

export type { Website } from "./types";

// Pluggable image rendering.
export * from "./images";

// Next.js metadata built from the content types above.
export * from "./metadata";
export * from "./utils";
export * from "./themes";
