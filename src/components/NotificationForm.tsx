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

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleScheduleChange = (value: string) => {
    handleChange("scheduleTime", value); // dejar el "T" intacto
  };

  const label = (text: string) => (
    <label style={{ fontSize: "15px", color: "#B4B4B4" }}>{text}</label>
  );

  const renderFields = () => {
    switch (notificationType) {
      case "EMAIL":
        return (
          <>
            {label("Para (To)")}
            {uiFactory.createInput(
              "Correo del destinatario",
              formData.to || "",
              (v) => handleChange("to", v)
            )}

            {label("Asunto")}
            {uiFactory.createInput(
              "Asunto del correo",
              formData.subject || "",
              (v) => handleChange("subject", v)
            )}

            {label("Contenido")}
            {uiFactory.createInput(
              "Cuerpo del mensaje",
              formData.body || "",
              (v) => handleChange("body", v)
            )}

            {label("CC (separado por comas)")}
            {uiFactory.createInput(
              "Correos CC",
              (formData.cc || []).join(","),
              (v) => handleChange("cc", String(v).split(","))
            )}

            {label("BCC (separado por comas)")}
            {uiFactory.createInput(
              "Correos BCC",
              (formData.bcc || []).join(","),
              (v) => handleChange("bcc", String(v).split(","))
            )}

            {label("Adjuntos (URLs separadas por coma)")}
            {uiFactory.createInput(
              "URLs de archivos",
              (formData.attachments || []).join(","),
              (v) => handleChange("attachments", String(v).split(","))
            )}

            {label("Prioridad")}
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
            {label("Número")}
            {uiFactory.createInput(
              "Número de teléfono",
              formData.phoneNumber || "",
              (v) => handleChange("phoneNumber", v)
            )}

            {label("Mensaje")}
            {uiFactory.createInput(
              "Contenido del SMS",
              formData.message || "",
              (v) => handleChange("message", v)
            )}

            {label("Remitente (opcional)")}
            {uiFactory.createInput(
              "ID del remitente",
              formData.senderId || "",
              (v) => handleChange("senderId", v)
            )}

            {label("¿Requiere reporte de entrega?")}
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

            {label("Fecha Programada")}
            <input
              type="datetime-local"
              style={{
                backgroundColor: "#364153",
                color: "#f9fafb",
                padding: "14px 20px",
                borderRadius: "10px",
                border: "1px solid #374151",
                width: "90%",
                marginTop: "6px",
                marginBottom: "24px",
                fontSize: "16px",
                outline: "none",
              }}
              onChange={(e) => handleScheduleChange(e.target.value)}
            />
          </>
        );

      case "PUSH":
        return (
          <>
            {label("Token de Dispositivo")}
            {uiFactory.createInput(
              "Token único",
              formData.deviceToken || "",
              (v) => handleChange("deviceToken", v)
            )}

            {label("Título")}
            {uiFactory.createInput(
              "Encabezado del mensaje",
              formData.title || "",
              (v) => handleChange("title", v)
            )}

            {label("Mensaje")}
            {uiFactory.createInput(
              "Texto de la notificación",
              formData.message || "",
              (v) => handleChange("message", v)
            )}

            {label("URL de Imagen (opcional)")}
            {uiFactory.createInput(
              "https://imagen.jpg",
              formData.imageUrl || "",
              (v) => handleChange("imageUrl", v)
            )}

            {label("Click Action")}
            {uiFactory.createInput(
              "Acción al hacer clic",
              formData.clickAction || "",
              (v) => handleChange("clickAction", v)
            )}

            {label("Prioridad")}
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
            {label("Número")}
            {uiFactory.createInput(
              "Número del destinatario",
              formData.phoneNumber || "",
              (v) => handleChange("phoneNumber", v)
            )}

            {label("Mensaje")}
            {uiFactory.createInput(
              "Texto del mensaje",
              formData.message || "",
              (v) => handleChange("message", v)
            )}

            {label("URL de Media")}
            {uiFactory.createInput(
              "https://archivo.jpg",
              formData.mediaUrl || "",
              (v) => handleChange("mediaUrl", v)
            )}

            {label("Caption")}
            {uiFactory.createInput(
              "Texto adicional",
              formData.caption || "",
              (v) => handleChange("caption", v)
            )}

            {label("Botones (separados por coma)")}
            {uiFactory.createInput(
              "Botón1,Botón2",
              (formData.interactiveButtons || []).join(","),
              (v) => handleChange("interactiveButtons", String(v).split(","))
            )}

            {label("Idioma")}
            {uiFactory.createInput(
              "es, en, etc.",
              formData.language || "",
              (v) => handleChange("language", v)
            )}
          </>
        );

      default:
        return uiFactory.createLabel("Tipo de notificación no reconocido");
    }
  };

  return uiFactory.createContainer(
    <>
      <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "30px" }}>
        <i className="fas fa-paper-plane text-white text-lg mr-2"></i>{" "}
        Formulario de {notificationType}
      </h1>

      {renderFields()}

      <div style={{ display: "flex", gap: "12px" }}>
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
