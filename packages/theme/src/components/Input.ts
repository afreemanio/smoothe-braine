const baseFieldStyle = { field: { borderRadius: 2 } }

export const Input = {
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
