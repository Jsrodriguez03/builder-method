// src/components/PDFReportConfigForm.tsx
import { useState } from "react";
import axios from "axios";

interface PDFReportConfigFormProps {
  onClose: () => void;
  paymentData: {
    paymentType: string;
    amount: string;
    response: number;
  };
}

export const PDFReportConfigForm = ({
  onClose,
  paymentData,
}: PDFReportConfigFormProps) => {
  const [includeLogo, setIncludeLogo] = useState(true);
  const [title, setTitle] = useState("Factura de Pago");
  const [includePaymentDetails, setIncludePaymentDetails] = useState(true);
  const [includeUserInfo, setIncludeUserInfo] = useState(false);
  const [theme, setTheme] = useState<"LIGHT" | "DARK">("LIGHT");
  const [includeTimestamp, setIncludeTimestamp] = useState(true);
  const [footerMessage, setFooterMessage] = useState(
    "Gracias por confiar en nosotros."
  );
  const [format, setFormat] = useState<"A4" | "LETTER">("A4");

  const handleDownload = async () => {
    try {
      const config = {
        includeLogo,
        title,
        includePaymentDetails,
        includeUserInfo,
        theme,
        includeTimestamp,
        footerMessage,
        format,
        ...paymentData,
      };

      const response = await axios.post(
        "http://localhost:8080/payment/reporte-pago",
        config,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "factura_pago.pdf";
      link.click();
      URL.revokeObjectURL(url);
      onClose();
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#000",
          padding: "25px",
          borderRadius: "8px",
          width: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2>Configuración del Reporte PDF</h2>

        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              checked={includeLogo}
              onChange={() => setIncludeLogo(!includeLogo)}
            />{" "}
            Incluir Logo
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              checked={includePaymentDetails}
              onChange={() => setIncludePaymentDetails(!includePaymentDetails)}
            />{" "}
            Incluir Detalles de Pago
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              checked={includeUserInfo}
              onChange={() => setIncludeUserInfo(!includeUserInfo)}
            />{" "}
            Incluir Info Usuario
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Tema:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as any)}
          >
            <option value="LIGHT">Claro</option>
            <option value="DARK">Oscuro</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              checked={includeTimestamp}
              onChange={() => setIncludeTimestamp(!includeTimestamp)}
            />{" "}
            Incluir Fecha/Hora
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Mensaje Pie de Página:</label>
          <textarea
            value={footerMessage}
            onChange={(e) => setFooterMessage(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Formato:</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as any)}
          >
            <option value="A4">A4</option>
            <option value="LETTER">Carta</option>
          </select>
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <button onClick={onClose} style={{ padding: "6px 12px" }}>
            Cancelar
          </button>
          <button
            onClick={handleDownload}
            style={{
              padding: "6px 12px",
              background: "#2899D8",
              color: "#fff",
            }}
          >
            Generar PDF
          </button>
        </div>
      </div>
    </div>
  );
};
