import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { CssBaseline } from "@mui/material";

import "mapbox-gl/dist/mapbox-gl.css";
import { Toaster } from "react-hot-toast";
import { UserLocationContextProvider } from "./context/UserLocationContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN_ID}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <CssBaseline />
      <Toaster position="top-center" reverseOrder={false} />
      <UserLocationContextProvider>
        <App />
      </UserLocationContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);
