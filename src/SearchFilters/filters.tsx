import React from "react";
import DateRangeFilterInput from "./inputs/DateRangeFilterInput";
import OptionsFilterInput from "./inputs/OptionsFilterInput";
import RadioFilterInput from "./inputs/RadioFilterInput";
import RangeFilterInput from "./inputs/RangeFilterInput";
import TextFilterInput from "./inputs/TextFilterInput";
import { DateRange, FilterDef, FilterInputProps, FilterOption } from "./types";

// Each call creates a new FilterComponent, and React remounts an input whose component changes.
// Call factories where columns are defined (module scope or a memo), not directly in a render.

// FilterDef values are unknown, so each factory checks a value with its guard before using it

/** A single choice from a fixed list of options. */
export function optionsFilter(options: FilterOption[]): FilterDef {
  const isOption = (value: unknown): value is string =>
    typeof value === "string" &&
    options.some((option) => option.value === value);
  const FilterComponent = ({ value, ...props }: FilterInputProps<unknown>) => (
    <OptionsFilterInput
      {...props}
      options={options}
      value={isOption(value) ? value : undefined}
    />
  );
  FilterComponent.displayName = "OptionsFilter";
  return {
    kind: "options",
    FilterComponent,
    encode: (value) => (isOption(value) ? value : undefined),
    decode: (raw) => (isOption(raw) ? raw : undefined),
  };
}

/** A yes/no choice, shown as radio buttons with the given labels and "All". */
export function booleanFilter(trueLabel = "Yes", falseLabel = "No"): FilterDef {
  const options = [
    { value: "true", label: trueLabel },
    { value: "false", label: falseLabel },
  ];
  const FilterComponent = ({
    value,
    onChange,
    ...props
  }: FilterInputProps<unknown>) => (
    <RadioFilterInput
      {...props}
      options={options}
      value={typeof value === "boolean" ? String(value) : undefined}
      onChange={(next) =>
        onChange(next === undefined ? undefined : next === "true")
      }
    />
  );
  FilterComponent.displayName = "BooleanFilter";
  return {
    kind: "boolean",
    FilterComponent,
    encode: (value) => (typeof value === "boolean" ? String(value) : undefined),
    decode: (raw) =>
      raw === "true" ? true : raw === "false" ? false : undefined,
  };
}

/** A numeric range between min and max, written as "lo..hi". */
export function rangeFilter({
  min,
  max,
  step,
}: {
  min: number;
  max: number;
  step?: number;
}): FilterDef {
  const isRange = (value: unknown): value is [number, number] =>
    Array.isArray(value) &&
    value.length === 2 &&
    value.every(Number.isFinite) &&
    min <= value[0] &&
    value[0] <= value[1] &&
    value[1] <= max;
  const FilterComponent = ({ value, ...props }: FilterInputProps<unknown>) => (
    <RangeFilterInput
      {...props}
      min={min}
      max={max}
      step={step}
      value={isRange(value) ? value : undefined}
    />
  );
  FilterComponent.displayName = "RangeFilter";
  return {
    kind: "range",
    FilterComponent,
    encode: (value) =>
      isRange(value) ? `${value[0]}..${value[1]}` : undefined,
    decode: (raw) => {
      const range = raw.split("..").map(Number);
      return isRange(range) ? range : undefined;
    },
  };
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isISODate = (value: unknown): value is string =>
  typeof value === "string" && ISO_DATE.test(value);

/** A DateRange with at least one end set. */
export const isDateRange = (value: unknown): value is DateRange => {
  if (typeof value !== "object" || value === null) return false;
  const from = "from" in value ? value.from : undefined;
  const to = "to" in value ? value.to : undefined;
  return (
    (from !== undefined || to !== undefined) &&
    (from === undefined || isISODate(from)) &&
    (to === undefined || isISODate(to))
  );
};

/** A range of days, written as "from..to" with either end left empty when open. */
export function dateRangeFilter(): FilterDef {
  const FilterComponent = ({ value, ...props }: FilterInputProps<unknown>) => (
    <DateRangeFilterInput
      {...props}
      value={isDateRange(value) ? value : undefined}
    />
  );
  FilterComponent.displayName = "DateRangeFilter";
  return {
    kind: "dateRange",
    FilterComponent,
    encode: (value) =>
      isDateRange(value) ? `${value.from ?? ""}..${value.to ?? ""}` : undefined,
    decode: (raw) => {
      const [from, to] = raw.split("..");
      const range = { from: from || undefined, to: to || undefined };
      return isDateRange(range) ? range : undefined;
    },
  };
}

const isText = (value: unknown): value is string =>
  typeof value === "string" && value !== "";

/** Free text the column should contain. */
export function textFilter(): FilterDef {
  const FilterComponent = ({ value, ...props }: FilterInputProps<unknown>) => (
    <TextFilterInput {...props} value={isText(value) ? value : undefined} />
  );
  FilterComponent.displayName = "TextFilter";
  return {
    kind: "text",
    FilterComponent,
    encode: (value) => (isText(value) ? value : undefined),
    decode: (raw) => (isText(raw) ? raw : undefined),
  };
}
