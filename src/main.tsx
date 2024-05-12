import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { CssBaseline } from "@mui/material";

import "mapbox-gl/dist/mapbox-gl.css";
import { Toaster } from "react-hot-toast";
import { UserLocationContextProvider } from "./context/UserLocationContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      cacheTime: 10000,
    },
  },
});
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontSize: 12,
  },
});
theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN_ID}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="top-center" reverseOrder={false} />
        <UserLocationContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </UserLocationContextProvider>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
