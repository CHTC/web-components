import React from "react";
import { Box, Slider, Typography } from "@mui/material";
import { FilterInputProps } from "../types";

export interface RangeFilterInputProps extends FilterInputProps<
  [number, number]
> {
  min: number;
  max: number;
  step?: number;
}

const RangeFilterInput = ({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: RangeFilterInputProps) => {
  const current = value ?? [min, max];
  return (
    <Box id={id} sx={{ display: "flex", alignItems: "center", gap: 2, px: 1 }}>
      <Slider
        getAriaLabel={(index) =>
          `${label} ${index === 0 ? "minimum" : "maximum"}`
        }
        value={current}
        min={min}
        max={max}
        step={step}
        size="small"
        valueLabelDisplay="auto"
        onChange={(_event, next) => {
          const [lo, hi] = next as number[];
          // The full range filters nothing, so it reads as unset
          onChange(lo === min && hi === max ? undefined : [lo, hi]);
        }}
      />
      <Typography
        variant="body2"
        sx={{ whiteSpace: "nowrap", minWidth: 80, textAlign: "right" }}
      >
        {current[0]} – {current[1]}
      </Typography>
    </Box>
  );
};

export default RangeFilterInput;
