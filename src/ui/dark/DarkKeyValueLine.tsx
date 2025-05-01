// src/components/UI/Dark/DarkKeyValueLine.tsx
import React from "react";
import { IKeyValueLine } from "../IKeyValueLine";

interface DarkKeyValueLineProps {
  label: string;
  value: string;
  styles?: {
    labelStyle?: React.CSSProperties;
    valueStyle?: React.CSSProperties;
  };
}

export class DarkKeyValueLine implements IKeyValueLine {
  constructor(private props: DarkKeyValueLineProps) {}

  render(): JSX.Element {
    const { label, value, styles } = this.props;
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              color: "#B4B4B4",
              fontSize: "16px",
              fontWeight: 400,
              ...styles?.labelStyle,
            }}
          >
            {label}
          </span>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 500,
              ...styles?.valueStyle,
            }}
          >
            {value}
          </span>
        </div>
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(196, 196, 196, 0.3)",
            marginBottom: "15px",
          }}
        />
      </>
    );
  }
}
