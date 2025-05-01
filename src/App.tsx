import { useState } from "react";
import { PaymentComponent } from "./components/PaymentComponent";
import { LightUIFactory } from "./factory/LightUIFactory";
import { DarkUIFactory } from "./factory/DarkUIFactory";
import "./index.css";

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const uiFactory =
    theme === "dark" ? new LightUIFactory() : new DarkUIFactory();

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isLight = theme === "dark";

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        backgroundColor: isLight ? "#f3f4f6" : "#0f172a",
        transition: "background-color 0.4s ease",
        padding: "30px",
        fontFamily: "Inter, sans-serif",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Título */}
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            color: isLight ? "#111827" : "#f9fafb",
          }}
        >
          App de Pagos
        </h1>

        {/* Botón cambiar tema */}
        <button
          onClick={toggleTheme}
          style={{
            background: "none",
            border: "none",
            fontSize: "30px",
            cursor: "pointer",
            color: isLight ? "#374151" : "#f9fafb",
            transition: "color 0.3s ease",
          }}
          aria-label="Toggle Theme"
        >
          {isLight ? "🌙" : "💡"}
        </button>
      </div>

      {/* Componente de Pago */}
      <PaymentComponent uiFactory={uiFactory} />
    </div>
  );
};

export default App;
