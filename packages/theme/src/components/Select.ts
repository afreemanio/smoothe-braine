const baseFieldStyle = { field: { borderRadius: 2 } }

export const Select = {
  parts: ["field", "addon"],
  baseStyle: {},
  sizes: {
    lg: baseFieldStyle,
    md: baseFieldStyle,
    sm: baseFieldStyle,
    xs: baseFieldStyle,
  },
  defaultProps: {
    variant: "filled",
    focusBorderColor: "purple.500",
  },
}
