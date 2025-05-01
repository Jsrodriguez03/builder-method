import React from "react";
import { IKeyValueLine } from "../IKeyValueLine";

interface LightKeyValueLineProps {
  label: string;
  value: string;
  styles?: {
    labelStyle?: React.CSSProperties;
    valueStyle?: React.CSSProperties;
  };
}

export class LightKeyValueLine implements IKeyValueLine {
  constructor(private props: LightKeyValueLineProps) {}

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
              color: "#676E7A",
              fontSize: "16px",
              fontWeight: 400,
              ...styles?.labelStyle,
            }}
          >
            {label}
          </span>
          <span
            style={{
              color: "#000",
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
            backgroundColor: "rgba(196, 196, 196)",
            marginBottom: "15px",
          }}
        />
      </>
    );
  }
}
