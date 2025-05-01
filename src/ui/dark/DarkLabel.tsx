// src/UI/dark/DarkLabel.tsx
import React from "react";

interface Props {
  text: string;
  options?: {
    htmlFor?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: number;
    margin?: string;
  };
}

export const DarkLabel: React.FC<Props> = ({ text, options = {} }) => {
  const {
    htmlFor,
    color = "#FFFFFF",
    fontSize = "10px",
    fontWeight = 500,
    margin = "35px 0 2px 0",
  } = options;

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
