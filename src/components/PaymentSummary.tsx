import { useState } from "react";
import { UIFactory } from "../factory/UIFactory";
import { PDFReportConfigForm } from "./PDFReportConfigForm";

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
  const [showPDFConfig, setShowPDFConfig] = useState(false);

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

  return uiFactory.createContainer(
    <>
      {/* Encabezado con botón de descarga */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{ fontSize: "24px", fontWeight: "700", marginBottom: "30px" }}
        >
          <i className="fas fa-receipt text-white text-lg mr-2"></i> Factura de
          Pago
        </h2>

        {/* Botón circular de descarga */}
        <button
          onClick={() => setShowPDFConfig(true)}
          style={{
            backgroundColor: "#2899D8",
            border: "none",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
            color: "#fff",
            width: "40px",
            height: "40px",
          }}
          title="Generar PDF"
        >
          <i className="fas fa-download" style={{ fontSize: "16px" }}></i>
        </button>
      </div>

      {/* Resumen del pago */}
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

      {/* Selección de tipo de notificación */}
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

      {/* Botones de acción */}
      <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
        {uiFactory.createButton(
          <>
            <i className="fas fa-rotate-left text-white mr-2"></i> Realizar otro
            pago
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

      {/* Superposición del formulario de PDF */}
      {showPDFConfig && (
        <PDFReportConfigForm
          uiFactory={uiFactory}
          onClose={() => setShowPDFConfig(false)}
          paymentData={{ paymentType, amount, response }}
        />
      )}
    </>
  );
};
