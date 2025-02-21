"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";
import {
  ChevronRight,
  AccountCircle,
  Home,
  Work,
  LibraryAdd,
  WorkHistory,
} from "@mui/icons-material";
import { ReactNode, useCallback, useMemo, useState } from "react";
import SidebarDrawer from "./SidebarDrawer";
import Logo from "../logo/Logo";
import Link from "next/link";
import { makeSuccessToast } from "@/lib/toast/toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export type Route = {
  name: string;
  href: string;
  icon: ReactNode;
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { state, logout } = useAuth();
  const { isAuthenticated } = state;
  const router = useRouter();

  const drawerWidth = 300;
  const handleOpenDrawer = useCallback(() => setOpen(true), []);
  const handleCloseDrawer = useCallback(() => setOpen(false), []);

  const handleLogout = () => {
    logout();
    router.push("/login");
    makeSuccessToast("Logout success");
  };

  const routes = useMemo<Route[]>(
    () => [
      { name: "Home", href: "/", icon: <Home /> },
      { name: "Jobs", href: "/jobs", icon: <Work /> },
    ],
    []
  );

  const employerRoutes = useMemo<Route[]>(
    () => [{ name: "Create Job", href: "/jobs/create", icon: <LibraryAdd /> }],
    []
  );

  const jobseekerRoutes = useMemo<Route[]>(
    () => [
      {
        name: "Application History",
        href: "/applications",
        icon: <WorkHistory />,
      },
    ],
    []
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          padding: "4px 0",
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Toolbar
            disableGutters
            sx={{
              width: "100%",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              {/* Tombol Menu */}
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                flex={1}
              >
                <IconButton
                  color="secondary"
                  onClick={handleOpenDrawer}
                  edge="start"
                >
                  <ChevronRight />
                </IconButton>
              </Stack>

              {/* Logo */}
              <Box
                sx={{
                  flex: 1,
                }}
              >
                <Logo />
              </Box>

              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                flex={1}
              >
                {/* Tombol Login */}
                {isAuthenticated ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<AccountCircle />}
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </Button>
                ) : (
                  <Link href="/login" style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<AccountCircle />}
                    >
                      LOGIN
                    </Button>
                  </Link>
                )}
              </Stack>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Sidebar Drawer */}
      <SidebarDrawer
        drawerWidth={drawerWidth}
        open={open}
        routes={routes}
        employerRoutes={employerRoutes}
        jobseekerRoutes={jobseekerRoutes}
        handleCloseDrawer={handleCloseDrawer}
      />
    </>
  );
};

export default Sidebar;
