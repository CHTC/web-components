import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { FilterInputProps, FilterOption } from "../types";

export interface RadioFilterInputProps extends FilterInputProps<string> {
  options: FilterOption[];
}

/** One choice from a few options shown side by side, with "All" for no filter. */
const RadioFilterInput = ({
  id,
  label,
  value,
  onChange,
  options,
}: RadioFilterInputProps) => (
  <RadioGroup
    id={id}
    aria-label={label}
    row
    value={value ?? ""}
    onChange={(e) => onChange(e.target.value || undefined)}
  >
    <FormControlLabel value="" control={<Radio size="small" />} label="All" />
    {options.map((option) => (
      <FormControlLabel
        key={option.value}
        value={option.value}
        control={<Radio size="small" />}
        label={option.label}
      />
    ))}
  </RadioGroup>
);

export default RadioFilterInput;
