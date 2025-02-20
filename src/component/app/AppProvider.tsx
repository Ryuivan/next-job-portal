import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";
import ThemeRegistry from "../theme/ThemeRegistry";
import { JobsProvider } from "@/context/JobContext";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeRegistry>
      <AuthProvider>
        <JobsProvider>{children}</JobsProvider>
      </AuthProvider>
    </ThemeRegistry>
  );
};

export default AppProvider;
