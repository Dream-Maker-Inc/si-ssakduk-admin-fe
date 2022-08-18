import "../common/styles/globals.css";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { theme } from "@/common/themes/Theme";
import { Layout } from "@/common/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
