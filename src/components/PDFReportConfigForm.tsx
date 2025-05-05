// src/components/PDFReportConfigForm.tsx
import { useState } from "react";
import { UIFactory } from "../factory/UIFactory";
import axios from "axios";
import Swal from "sweetalert2";

interface PDFReportConfigFormProps {
  uiFactory: UIFactory;
  onClose: () => void;
  paymentData: {
    paymentType: string;
    amount: string;
    response: number;
  };
}

export const PDFReportConfigForm = ({
  uiFactory,
  onClose,
  paymentData,
}: PDFReportConfigFormProps) => {
  const [config, setConfig] = useState({
    title: "Factura de Pago",
    includeLogo: true,
    includePaymentDetails: true,
    includeUserInfo: true,
    includeDate: true,
    theme: "LIGHT",
    format: "A4",
    footerMessage: "Gracias por confiar en nuestros servicios",
  });

  const handleChange = (field: string, value: any) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const label = (text: string) => (
    <label style={{ fontSize: "15px", color: "#B4B4B4" }}>{text}</label>
  );

  const handleSubmit = async () => {
    try {
      const payload = {
        ...config,
        paymentType: paymentData.paymentType,
        paymentAmount: paymentData.amount.toString(),
        paymentTotal: paymentData.response.toString(),
        paymentTax: (
          Number(paymentData.response) - Number(paymentData.amount)
        ).toFixed(2),
      };

      const response = await axios.post(
        "http://localhost:8080/payment/reporte-pago",
        payload,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "reporte_pago.pdf";
      link.click();

      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: "PDF generado correctamente",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });

      onClose();
    } catch (error) {
      console.error("Error generando PDF:", error);
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: "Error al generar PDF",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
    }
  };

  return uiFactory.createContainer(
    <>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "30px" }}>
        <i className="fas fa-file-pdf text-white text-lg mr-2"></i> Configurar
        Reporte PDF
      </h2>

      {label("Título del Reporte")}
      {uiFactory.createInput("Ej: Resumen de Pago", config.title, (v) =>
        handleChange("title", v)
      )}

      {label("Mensaje de Pie")}
      {uiFactory.createInput(
        "Ej: Gracias por su pago",
        config.footerMessage,
        (v) => handleChange("footerMessage", v)
      )}

      {label("Tema del Reporte")}
      {uiFactory.createSelect(
        [
          { label: "Claro", value: "LIGHT" },
          { label: "Oscuro", value: "DARK" },
        ],
        config.theme,
        (e) => handleChange("theme", e.target.value)
      )}

      {label("Formato del PDF")}
      {uiFactory.createSelect(
        [
          { label: "A4", value: "A4" },
          { label: "Carta", value: "LETTER" },
          { label: "Legal", value: "LEGAL" },
        ],
        config.format,
        (e) => handleChange("format", e.target.value)
      )}

      {label("Elementos a Incluir")}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label style={{ color: "#fff" }}>
          <input
            type="checkbox"
            checked={config.includeLogo}
            onChange={(e) => handleChange("includeLogo", e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          Incluir Logo
        </label>
        <label style={{ color: "#fff" }}>
          <input
            type="checkbox"
            checked={config.includePaymentDetails}
            onChange={(e) =>
              handleChange("includePaymentDetails", e.target.checked)
            }
            style={{ marginRight: "8px" }}
          />
          Incluir Detalles del Pago
        </label>
        <label style={{ color: "#fff" }}>
          <input
            type="checkbox"
            checked={config.includeUserInfo}
            onChange={(e) => handleChange("includeUserInfo", e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          Incluir Información del Usuario
        </label>
        <label style={{ color: "#fff" }}>
          <input
            type="checkbox"
            checked={config.includeDate}
            onChange={(e) => handleChange("includeDate", e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          Incluir Fecha del Reporte
        </label>
      </div>

      <div style={{ display: "flex", gap: "12px", marginTop: "25px" }}>
        {uiFactory.createButton(
          <>
            <i className="fas fa-times text-white mr-2"></i> Cancelar
          </>,
          onClose
        )}
        {uiFactory.createButton(
          <>
            <i className="fas fa-file-pdf text-white mr-2"></i> Generar PDF
          </>,
          handleSubmit
        )}
      </div>
    </>
  );
};
