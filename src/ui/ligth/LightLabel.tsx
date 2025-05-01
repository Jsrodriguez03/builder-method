import React from "react";

interface LightLabelProps {
  text: string;
  options?: {
    htmlFor?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: number;
    margin?: string;
  };
}

export const LightLabel: React.FC<LightLabelProps> = ({ text, options }) => {
  const {
    htmlFor,
    color = "#000",
    fontSize = "10px",
    fontWeight = 500,
    margin = "35px 0 2px 0",
  } = options || {};

  return (
    <label
      htmlFor={htmlFor}
      style={{
        color,
        fontSize,
        fontWeight,
        margin,
        display: "block",
      }}
    >
      {text}
    </label>
  );
};
