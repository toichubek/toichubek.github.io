import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import { HelmetProvider } from "react-helmet-async";
import "./helpers/i18n";

Modal.setAppElement("#root");

ReactDOM.render(
  <Suspense fallback={"Загрузка..."}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Suspense>,
  document.getElementById("root")
);
