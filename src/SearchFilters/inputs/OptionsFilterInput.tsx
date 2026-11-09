import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FilterInputProps, FilterOption } from "../types";

export interface OptionsFilterInputProps extends FilterInputProps<string> {
  options: FilterOption[];
}

const OptionsFilterInput = ({
  id,
  label,
  value,
  onChange,
  options,
}: OptionsFilterInputProps) => (
  <FormControl size="small" fullWidth>
    <InputLabel id={id}>{label}</InputLabel>
    <Select
      labelId={id}
      label={label}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value || undefined)}
    >
      <MenuItem value="">All</MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default OptionsFilterInput;
