// src/components/NotificationForm.tsx
import { useState } from "react";
import { UIFactory } from "../factory/UIFactory";

interface NotificationFormProps {
  uiFactory: UIFactory;
  notificationType: string;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export const NotificationForm = ({
  uiFactory,
  notificationType,
  onCancel,
  onSubmit,
}: NotificationFormProps) => {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderFields = () => {
    switch (notificationType) {
      case "EMAIL":
        return (
          <>
            {uiFactory.createInput("Para (To)", formData.to || "", (v) =>
              handleChange("to", v)
            )}
            {uiFactory.createInput("Asunto", formData.subject || "", (v) =>
              handleChange("subject", v)
            )}
            {uiFactory.createInput("Contenido", formData.body || "", (v) =>
              handleChange("body", v)
            )}
            {uiFactory.createInput(
              "CC (separado por comas)",
              (formData.cc || []).join(","),
              (v) => handleChange("cc", String(v).split(","))
            )}
            {uiFactory.createInput(
              "BCC (separado por comas)",
              (formData.bcc || []).join(","),
              (v) => handleChange("bcc", String(v).split(","))
            )}
            {uiFactory.createInput(
              "Adjuntos (URLs separadas por comas)",
              (formData.attachments || []).join(","),
              (v) => handleChange("attachments", String(v).split(","))
            )}

            {uiFactory.createSelect(
              [
                { label: "Seleccionar", value: "Seleccionar" },
                { label: "Alta", value: "alta" },
                { label: "Media", value: "media" },
                { label: "Baja", value: "baja" },
              ],
              formData.priority || "",
              (e) => handleChange("priority", e.target.value)
            )}
          </>
        );

      case "SMS":
        return (
          <>
            {uiFactory.createInput("Número", formData.phoneNumber || "", (v) =>
              handleChange("phoneNumber", v)
            )}
            {uiFactory.createInput("Mensaje", formData.message || "", (v) =>
              handleChange("message", v)
            )}
            {uiFactory.createInput(
              "Remitente (opcional)",
              formData.senderId || "",
              (v) => handleChange("senderId", v)
            )}
            {uiFactory.createSelect(
              [
                { label: "Seleccionar", value: "Seleccionar" },
                { label: "Sí", value: "true" },
                { label: "No", value: "false" },
              ],
              String(formData.deliveryReportRequired ?? ""),
              (e) =>
                handleChange(
                  "deliveryReportRequired",
                  e.target.value === "true"
                )
            )}
            {uiFactory.createInput(
              "Fecha Programada (YYYY-MM-DD HH:mm)",
              formData.scheduleTime || "",
              (v) => handleChange("scheduleTime", v)
            )}
          </>
        );

      case "PUSH":
        return (
          <>
            {uiFactory.createInput(
              "Token de Dispositivo",
              formData.deviceToken || "",
              (v) => handleChange("deviceToken", v)
            )}
            {uiFactory.createInput("Título", formData.title || "", (v) =>
              handleChange("title", v)
            )}
            {uiFactory.createInput("Mensaje", formData.message || "", (v) =>
              handleChange("message", v)
            )}
            {uiFactory.createInput(
              "URL de Imagen (opcional)",
              formData.imageUrl || "",
              (v) => handleChange("imageUrl", v)
            )}
            {uiFactory.createInput(
              "Click Action (URL o acción)",
              formData.clickAction || "",
              (v) => handleChange("clickAction", v)
            )}
            {uiFactory.createSelect(
              [
                { label: "Seleccionar", value: "Seleccionar" },
                { label: "Urgente", value: "urgente" },
                { label: "Normal", value: "normal" },
              ],
              formData.priority || "",
              (e) => handleChange("priority", e.target.value)
            )}
          </>
        );

      case "WHATSAPP":
        return (
          <>
            {uiFactory.createInput("Número", formData.phoneNumber || "", (v) =>
              handleChange("phoneNumber", v)
            )}
            {uiFactory.createInput("Mensaje", formData.message || "", (v) =>
              handleChange("message", v)
            )}
            {uiFactory.createInput(
              "URL de Media (imagen/video/documento)",
              formData.mediaUrl || "",
              (v) => handleChange("mediaUrl", v)
            )}
            {uiFactory.createInput(
              "Caption (si aplica)",
              formData.caption || "",
              (v) => handleChange("caption", v)
            )}
            {uiFactory.createInput(
              "Botones (separados por coma)",
              (formData.interactiveButtons || []).join(","),
              (v) => handleChange("interactiveButtons", String(v).split(","))
            )}
            {uiFactory.createInput("Idioma", formData.language || "", (v) =>
              handleChange("language", v)
            )}
          </>
        );

      default:
        return uiFactory.createLabel("Tipo de notificación no reconocido");
    }
  };

  return uiFactory.createContainer(
    <>
      <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "30px" }}>
        <i className="fas fa-paper-plane text-white text-lg mr-2"></i>{" "}
        Formulario de {notificationType}
      </h2>

      {renderFields()}

      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        {uiFactory.createButton(
          <>
            <i className="fas fa-times-circle text-white mr-2"></i> Cancelar
          </>,
          onCancel
        )}
        {uiFactory.createButton(
          <>
            <i className="fas fa-check-circle text-white mr-2"></i> Enviar
          </>,
          () => onSubmit(formData)
        )}
      </div>
    </>
  );
};
