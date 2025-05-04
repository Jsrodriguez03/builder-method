// src/components/UI/Dark/DarkInput.tsx
import { IInput } from "../IInput";

interface DarkInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export class DarkInput implements IInput {
  constructor(private props: DarkInputProps) {}

  render(): JSX.Element {
    const { placeholder, value, onChange } = this.props;
    return (
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          backgroundColor: "#364153",
          color: "#f9fafb",
          padding: "14px 20px",
          borderRadius: "10px",
          border: "1px solid #374151",
          width: "91%",
          marginTop: "6px",
          marginBottom: "24px",
          fontSize: "16px",
          outline: "none",
          transition: "border-color 0.3s ease",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#818cf8")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#374151")}
      />
    );
  }
}
