import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { UIFactory } from "../factory/UIFactory";

interface PaymentSummaryProps {
  uiFactory: UIFactory;
  paymentType: string;
  amount: string;
  response: number;
  notificationType: string;
  onNewPayment: () => void;
  onSendNotification: () => void;
  onNotificationTypeChange: (value: string) => void;
}

const TAX_RATES: Record<string, number> = {
  CREDIT_CARD: 3,
  DEBIT_CARD: 1,
  PAYPAL: 2,
};

const EXTRA_CHARGES: Record<string, { threshold: number; extra: number }> = {
  CREDIT_CARD: { threshold: 1000, extra: 10 },
  DEBIT_CARD: { threshold: 500, extra: 5 },
  PAYPAL: { threshold: 750, extra: 7 },
};

export const PaymentSummary = ({
  uiFactory,
  paymentType,
  amount,
  response,
  notificationType,
  onNewPayment,
  onSendNotification,
  onNotificationTypeChange,
}: PaymentSummaryProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const amountNumber = Number(amount);
  const taxRate = TAX_RATES[paymentType as keyof typeof TAX_RATES] ?? 0;

  const baseTax = amountNumber * (taxRate / 100);
  const extraCharge =
    EXTRA_CHARGES[paymentType as keyof typeof EXTRA_CHARGES] &&
    amountNumber >
      EXTRA_CHARGES[paymentType as keyof typeof EXTRA_CHARGES].threshold
      ? EXTRA_CHARGES[paymentType as keyof typeof EXTRA_CHARGES].extra
      : 0;

  const taxAmount = baseTax + extraCharge;

  const handleDownload = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("factura_pago.pdf");
    }
  };

  return uiFactory.createContainer(
    <div style={{ position: "relative" }}>
      {/* <button
        onClick={handleDownload}
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
      </button> */}

      {uiFactory.createBtnDowload(handleDownload)}

      <div ref={contentRef}>
        <h2
          style={{ fontSize: "24px", fontWeight: "700", marginBottom: "30px" }}
        >
          <i className="fas fa-receipt text-white text-lg mr-2"></i> Factura de
          Pago
        </h2>

        {uiFactory.createKeyValueLine("Método de Pago:", paymentType)}
        {uiFactory.createKeyValueLine(
          "Monto Inicial:",
          `$${amountNumber.toFixed(2)} USD`
        )}
        {uiFactory.createKeyValueLine(
          `Impuesto:`,
          `$${taxAmount.toFixed(2)} USD`
        )}
        {uiFactory.createKeyValueLine(
          "Total a Pagar:",
          `$${Number(response).toFixed(2)} USD`,
          {
            labelStyle: { fontSize: "16px", fontWeight: 600 },
            valueStyle: { fontWeight: 600, color: "#2899D8", fontSize: "18px" },
          }
        )}

        {uiFactory.createLabel("Tipo de Notificación a Enviar", {
          htmlFor: "notification",
          fontSize: "16px",
        })}

        {uiFactory.createSelect(
          [
            { label: "Seleccionar", value: "Seleccionar" },
            { label: "Email", value: "EMAIL" },
            { label: "SMS", value: "SMS" },
            { label: "PUSH", value: "PUSH" },
            { label: "WhatsApp", value: "WHATSAPP" },
          ],
          notificationType,
          (e) => onNotificationTypeChange(e.target.value)
        )}

        <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
          {uiFactory.createButton(
            <>
              <i className="fas fa-rotate-left text-white mr-2"></i> Realizar
              otro pago
            </>,
            onNewPayment
          )}

          {uiFactory.createButton(
            <>
              <i className="fas fa-paper-plane text-white mr-2"></i> Enviar
              notificación
            </>,
            onSendNotification,
            notificationType === "Seleccionar"
          )}
        </div>
      </div>
    </div>
  );
};
