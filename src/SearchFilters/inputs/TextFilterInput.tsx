import React, { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import { FilterInputProps } from "../types";

export interface TextFilterInputProps extends FilterInputProps<string> {
  /** How long typing has to pause before the value changes, in milliseconds. */
  delay?: number;
}

/** Free text, reported once typing pauses so each keystroke doesn't start a search. */
const TextFilterInput = ({
  id,
  label,
  value,
  onChange,
  delay = 300,
}: TextFilterInputProps) => {
  const [input, setInput] = useState(value ?? "");

  // The timer reads the latest onChange through a ref, so a new callback doesn't restart it
  const latestOnChange = useRef(onChange);
  useEffect(() => {
    latestOnChange.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (input === (value ?? "")) return;
    const timer = setTimeout(
      () => latestOnChange.current(input || undefined),
      delay,
    );
    return () => clearTimeout(timer);
  }, [input, value, delay]);

  return (
    <TextField
      id={id}
      label={label}
      size="small"
      fullWidth
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default TextFilterInput;
