// src/factory/UIFactory.ts
export interface UIFactory {
  createButton(
    label: string,
    onClick: () => void,
    disabled?: boolean
  ): JSX.Element;

  createInput(
    placeholder: string,
    value: string,
    onChange: (value: string) => void
  ): JSX.Element;

  createSelect(
    options: { label: string; value: string }[],
    value: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  ): JSX.Element;

  createContainer(children: React.ReactNode): JSX.Element;

  createKeyValueLine(
    label: string,
    value: string | number,
    options?: {
      labelStyle?: React.CSSProperties;
      valueStyle?: React.CSSProperties;
    }
  ): JSX.Element;

  createLabel(
    text: string,
    options?: {
      htmlFor?: string;
      color?: string;
      fontSize?: string;
      fontWeight?: number;
      margin?: string;
    }
  ): JSX.Element;

  createBtnDowload(onClick: () => void): JSX.Element;
}
