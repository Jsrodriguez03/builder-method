// src/components/PaymentSummary.tsx
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
      <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "30px" }}>
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
    </>
  );
};
