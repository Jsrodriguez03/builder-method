import React from "react";
import { Button } from "../IButton";

interface LightButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export class LightButton implements Button {
  private props: LightButtonProps;

  constructor(props: LightButtonProps) {
    this.props = props;
  }

  render(): JSX.Element {
    const { onClick, disabled = false, children } = this.props;
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          backgroundColor: "#F5F5F5",
          color: "#333",
          padding: "10px 16px",
          border: "1px solid #DDD",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "15px",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {children}
      </button>
    );
  }
}
