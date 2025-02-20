import type { Metadata } from "next";
import "./globals.css";
import { Container } from "@mui/material";
import Sidebar from "@/component/ui/sidebar/Sidebar";
import AppProvider from "@/component/app/AppProvider";
import { Bounce, ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Sidebar />
          <Container
            maxWidth="xl"
            disableGutters
            sx={{
              color: "text.primary",
              backgroundColor: "background.default",
            }}
          >
            {children}
          </Container>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
            transition={Bounce}
          />
        </AppProvider>
      </body>
    </html>
  );
}
