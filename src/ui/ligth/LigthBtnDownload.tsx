// src/components/UI/Dark/DarkContainer.tsx

import { BtnDownload } from "../BtnDownload";

interface LigthBtnDownloadProps {
  onClick: () => void;
}

export class LigthBtnDownload implements BtnDownload {
  constructor(private props: LigthBtnDownloadProps) {}

  render(): JSX.Element {
    const { onClick } = this.props;
    return (
      <button
        onClick={onClick}
        title="Descargar factura"
        style={{
          position: "absolute",
          top: -20,
          right: 0,
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#2899D8",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          transition: "background-color 0.3s ease",
        }}
      >
        <i className="fas fa-download" style={{ fontSize: "20px" }}></i>
      </button>
    );
  }
}
