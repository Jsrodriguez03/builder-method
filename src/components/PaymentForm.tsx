// src/components/PaymentForm.tsx
import { UIFactory } from "../factory/UIFactory";

interface PaymentFormProps {
  uiFactory: UIFactory;
  paymentType: string;
  amount: string;
  isFormValid: boolean;
  onPaymentTypeChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onSubmit: () => void;
}

export const PaymentForm = ({
  uiFactory,
  paymentType,
  amount,
  isFormValid,
  onPaymentTypeChange,
  onAmountChange,
  onSubmit,
}: PaymentFormProps) => {
  return uiFactory.createContainer(
    <>
      <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px" }}>
        Calcular Pago
      </h1>

      <label htmlFor="payment" style={{ fontSize: "15px", color: "#B4B4B4" }}>
        Método de Pago
      </label>
      {uiFactory.createSelect(
        [
          { label: "Seleccione un Método", value: "Seleccione un Método" },
          { label: "Tarjeta Crédito", value: "CREDIT_CARD" },
          { label: "Tarjeta Débito", value: "DEBIT_CARD" },
          { label: "PayPal", value: "PAYPAL" },
        ],
        paymentType,
        (e) => onPaymentTypeChange(e.target.value)
      )}

      <label htmlFor="amount" style={{ fontSize: "15px", color: "#B4B4B4" }}>
        Monto
      </label>
      {uiFactory.createInput("Ingrese el monto", amount, (e) =>
        onAmountChange(e.target.value)
      )}

      {uiFactory.createButton(
        <>
          <i className="fas fa-calculator text-white mr-2"></i> Calcular Pago
        </>,
        onSubmit,
        !isFormValid
      )}
    </>
  );
};
