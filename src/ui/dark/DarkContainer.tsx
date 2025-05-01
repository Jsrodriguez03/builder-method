// src/components/UI/Dark/DarkContainer.tsx
import React from "react";
import { IContainer } from "../IContainer";

interface DarkContainerProps {
  children: React.ReactNode;
}

export class DarkContainer implements IContainer {
  constructor(private props: DarkContainerProps) {}

  render(): JSX.Element {
    return (
      <div
        style={{
          backgroundColor: "#1E2939",
          color: "#f9fafb",
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "450px",
          margin: "60px auto",
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
