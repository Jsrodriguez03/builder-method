import { useState } from "react";
import { UIFactory } from "../factory/UIFactory";
import axios from "axios";
import Swal from "sweetalert2";
import { PaymentForm } from "./PaymentForm";
import { PaymentSummary } from "./PaymentSummary";

interface PaymentComponentProps {
  uiFactory: UIFactory;
}

export const PaymentComponent = ({ uiFactory }: PaymentComponentProps) => {
  const [paymentType, setPaymentType] = useState("Seleccione un Método");
  const [amount, setAmount] = useState("");
  const [notificationType, setNotificationType] = useState("Seleccionar");
  const [response, setResponse] = useState<any>(null);
  const [showSummary, setShowSummary] = useState(false);

  const isFormValid =
    amount.trim() !== "" && paymentType !== "Seleccione un Método";

  const handlePayment = async () => {
    try {
      const res = await axios.post("http://localhost:8080/payment/pay", null, {
        params: { paymentType, amount, notificationType },
      });
      setResponse(res.data);
      setShowSummary(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendNotification = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/payment/notification",
        null,
        {
          params: { paymentType, amount, notificationType },
        }
      );
      setResponse(res.data);
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: "¡Notificación Enviada!",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
      setNotificationType("Seleccionar");
    } catch (error) {
      console.error(error);
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title:
          "Error al enviar notificación, seleccione un tipo de notificación",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
    }
  };

  const handleNewPayment = () => {
    setAmount("");
    setPaymentType("Seleccione un Método");
    setNotificationType("Seleccionar");
    setResponse(null);
    setShowSummary(false);
  };

  if (showSummary) {
    return (
      <PaymentSummary
        uiFactory={uiFactory}
        paymentType={paymentType}
        amount={amount}
        response={response}
        notificationType={notificationType}
        onNotificationTypeChange={setNotificationType}
        onSendNotification={handleSendNotification}
        onNewPayment={handleNewPayment}
      />
    );
  }

  return (
    <PaymentForm
      uiFactory={uiFactory}
      paymentType={paymentType}
      amount={amount}
      isFormValid={isFormValid}
      onPaymentTypeChange={setPaymentType}
      onAmountChange={setAmount}
      onSubmit={handlePayment}
    />
  );
};
