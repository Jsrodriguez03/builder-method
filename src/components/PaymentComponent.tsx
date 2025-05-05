import { useState } from "react";
import { UIFactory } from "../factory/UIFactory";
import axios from "axios";
import Swal from "sweetalert2";
import { PaymentForm } from "./PaymentForm";
import { PaymentSummary } from "./PaymentSummary";
import { NotificationForm } from "./NotificationForm";
import { PDFReportConfigForm } from "./PDFReportConfigForm";

interface PaymentComponentProps {
  uiFactory: UIFactory;
}

export const PaymentComponent = ({ uiFactory }: PaymentComponentProps) => {
  const [paymentType, setPaymentType] = useState("Seleccione un Método");
  const [amount, setAmount] = useState("");
  const [notificationType, setNotificationType] = useState("Seleccionar");
  const [response, setResponse] = useState<any>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [showReportConfig, setShowReportConfig] = useState(false); // <-- control del PDF form

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

  const handleSendNotification = () => {
    if (notificationType === "Seleccionar") {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: "Seleccione un tipo de notificación primero",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
      return;
    }

    setShowNotificationForm(true);
  };

  const handleSubmitNotificationForm = async (notificationData: any) => {
    try {
      const payload = {
        paymentType,
        amount,
        type: notificationType,
        ...notificationData,
      };

      await axios.post("http://localhost:8080/payment/notification", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setShowNotificationForm(false);
      setNotificationType("Seleccionar");

      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: "¡Notificación Enviada!",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error enviando notificación:", error);
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: "Error al enviar notificación",
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
    setShowNotificationForm(false);
    setShowReportConfig(false);
  };

  // Mostrar formulario de notificación
  if (showNotificationForm) {
    return (
      <NotificationForm
        uiFactory={uiFactory}
        notificationType={notificationType}
        onCancel={() => setShowNotificationForm(false)}
        onSubmit={handleSubmitNotificationForm}
      />
    );
  }

  // Mostrar formulario de configuración PDF
  if (showReportConfig && response) {
    return (
      <PDFReportConfigForm
        uiFactory={uiFactory}
        onClose={() => setShowReportConfig(false)}
        paymentData={{ paymentType, amount, response }}
      />
    );
  }

  // Mostrar resumen de pago
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
        onGenerateReport={() => setShowReportConfig(true)}
      />
    );
  }

  // Mostrar formulario de pago
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
