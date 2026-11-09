import React from "react";
import OptionsFilterInput from "./inputs/OptionsFilterInput";
import RangeFilterInput from "./inputs/RangeFilterInput";
import { FilterDef, FilterInputProps, FilterOption } from "./types";

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

/** A yes/no choice, shown as two options with the given labels. */
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
    <OptionsFilterInput
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
