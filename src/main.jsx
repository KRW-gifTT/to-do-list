import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.jsx";
import React from "react";
import { ConfigProvider } from "antd";
import routers from "./router";
import { RouterProvider } from "react-router/dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token, affects wide range
          colorPrimary: "#9966CC",
          borderRadius: 10,
          // Derived token, affects narrow range
          colorBgContainer: "ffffff",
        },
      }}
    >
      <RouterProvider router={routers} />
    </ConfigProvider>
  </StrictMode>,
);
