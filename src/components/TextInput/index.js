import React from "react";
import {
  Input,
  InputLabel,
  Box,
  Typography,
} from "@material-ui/core";
import useStyles, { style } from "./styles";

export default function TextInput({
  id,
  label,
  styleInput,
  error,
  startAdornment,
  endAdornment,
  inputRef,
  placeholder,
  ...other
}) {
  const styles = useStyles();

  return (
    <Box className={styles.inputWrapper}>
      <InputLabel htmlFor={id} style={style.label}>
        {label}
      </InputLabel>
        <Input
          inputProps={{
            className: styles.input,
            style: styleInput,
          }}
          placeholder={placeholder}
          id={id}
          startAdornment={startAdornment || null}
          endAdornment={endAdornment || null}
          inputRef={inputRef || null}
          onBlur={other.onBlur || null}
          {...other}
        />
      {error && (
        <Typography className={styles.labelError}>
          {error.toUpperCase()}
        </Typography>
      )}
    </Box>
  );
}
