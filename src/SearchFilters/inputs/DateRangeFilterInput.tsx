import React from "react";
import { Box, TextField } from "@mui/material";
import { DateRange, FilterInputProps } from "../types";

export type DateRangeFilterInputProps = FilterInputProps<DateRange>;

/** From and To date fields; either can be left empty for an open-ended range. */
const DateRangeFilterInput = ({
  id,
  label,
  value,
  onChange,
}: DateRangeFilterInputProps) => {
  const setEnd = (end: keyof DateRange, date: string) => {
    const next = { ...value, [end]: date || undefined };
    // Both ends empty means no filter
    onChange(next.from || next.to ? next : undefined);
  };

  return (
    <Box id={id} sx={{ display: "flex", gap: 1 }}>
      <TextField
        type="date"
        size="small"
        label={`${label} from`}
        value={value?.from ?? ""}
        onChange={(e) => setEnd("from", e.target.value)}
        // The picker won't offer a From after the To
        slotProps={{
          inputLabel: { shrink: true },
          htmlInput: { max: value?.to },
        }}
        fullWidth
      />
      <TextField
        type="date"
        size="small"
        label="to"
        value={value?.to ?? ""}
        onChange={(e) => setEnd("to", e.target.value)}
        slotProps={{
          inputLabel: { shrink: true },
          htmlInput: { min: value?.from },
        }}
        fullWidth
      />
    </Box>
  );
};

export default DateRangeFilterInput;
