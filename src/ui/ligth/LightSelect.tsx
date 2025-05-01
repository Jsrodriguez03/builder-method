import React from "react";
import { ISelect } from "../ISelect";

interface LightSelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export class LightSelect implements ISelect {
  private props: LightSelectProps;

  constructor(props: LightSelectProps) {
    this.props = props;
  }

  render(): JSX.Element {
    const { options, value, onChange } = this.props;
    return (
      <select
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: "#f9fafb",
          color: "#111827",
          padding: "14px 20px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
          width: "100%",
          marginTop: "6px",
          marginBottom: "24px",
          fontSize: "16px",
          outline: "none",
          transition: "border-color 0.3s ease",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#2563eb")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
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
