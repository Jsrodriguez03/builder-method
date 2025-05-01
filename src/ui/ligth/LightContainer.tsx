import { JSX } from "react";
import { IContainer } from "../IContainer";

interface LightContainerProps {
  children: React.ReactNode;
}

export class LightContainer implements IContainer {
  private props: LightContainerProps;

  constructor(props: LightContainerProps) {
    this.props = props;
  }

  render(): JSX.Element {
    const { children } = this.props;
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#111827",
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "450px",
          margin: "60px auto",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        {children}
      </div>
    );
  }
}
