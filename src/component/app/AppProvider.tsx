import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";
import ThemeRegistry from "../theme/ThemeRegistry";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeRegistry>
      <AuthProvider>{children}</AuthProvider>
    </ThemeRegistry>
  );
};

export default AppProvider;
