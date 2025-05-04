// src/components/UI/Dark/DarkSelect.tsx
import React from "react";
import { ISelect } from "../ISelect";

interface DarkSelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export class DarkSelect implements ISelect {
  constructor(private props: DarkSelectProps) {}

  render(): JSX.Element {
    const { options, value, onChange } = this.props;
    return (
      <select
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: "#364153",
          color: "#f9fafb",
          padding: "14px 20px",
          borderRadius: "10px",
          border: "1px solid #374151",
          width: "100%",
          marginTop: "6px",
          marginBottom: "24px",
          fontSize: "16px",
          outline: "none",
          transition: "border-color 0.3s ease",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#818cf8")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#374151")}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
}
