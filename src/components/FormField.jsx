import React from 'react';
import { TextField, FormHelperText, InputAdornment, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function FormField({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required,
  type = 'text',
  multiline = false,
  rows = 1,
  tooltip,
  startAdornment,
  endAdornment,
  ...props
}) {
  return (
    <>
      <TextField
        fullWidth
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        required={required}
        type={type}
        multiline={multiline}
        rows={rows}
        variant="outlined"
        InputProps={{
          startAdornment: startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {tooltip && (
                <Tooltip title={tooltip} arrow>
                  <IconButton edge="end" size="small" tabIndex={-1}>
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              {endAdornment}
            </InputAdornment>
          ),
        }}
        aria-describedby={`${name}-helper-text`}
        {...props}
      />
      {(error || helperText) && (
        <FormHelperText 
          id={`${name}-helper-text`} 
          error={!!error}
          sx={{ ml: 1.5, mt: 0.5 }}
        >
          {error || helperText}
        </FormHelperText>
      )}
    </>
  );
}