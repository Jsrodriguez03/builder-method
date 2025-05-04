import React from "react";
import { IInput } from "../IInput";

interface LightInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export class LightInput implements IInput {
  private props: LightInputProps;

  constructor(props: LightInputProps) {
    this.props = props;
  }

  render(): JSX.Element {
    const { placeholder, value, onChange } = this.props;
    return (
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          backgroundColor: "#f9fafb",
          color: "#111827",
          padding: "14px 20px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
          width: "91%",
          marginTop: "6px",
          marginBottom: "24px",
          fontSize: "16px",
          outline: "none",
          transition: "border-color 0.3s ease",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#2563eb")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
      />
    );
  }
}
