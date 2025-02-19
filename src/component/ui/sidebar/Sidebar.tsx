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
import { ChevronRight, AccountCircle, Home, Work } from "@mui/icons-material";
import { ReactNode, useCallback, useMemo, useState } from "react";
import SidebarDrawer from "./SidebarDrawer";
import Logo from "../logo/Logo";
import Link from "next/link";

export type Route = {
  name: string;
  href: string;
  icon: ReactNode;
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const drawerWidth = 300;

  const handleOpenDrawer = useCallback(() => setOpen(true), []);
  const handleCloseDrawer = useCallback(() => setOpen(false), []);

  const routes = useMemo<Route[]>(
    () => [
      { name: "Home", href: "/", icon: <Home /> },
      { name: "Jobs", href: "/jobs", icon: <Work /> },
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
          padding: "4px 0"
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Toolbar disableGutters>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              {/* Tombol Menu */}
              <IconButton
                color="secondary"
                onClick={handleOpenDrawer}
                edge="start"
              >
                <ChevronRight />
              </IconButton>

              {/* Logo */}
              <Logo />

              {/* Tombol Login */}
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<AccountCircle />}
                >
                  LOGIN
                </Button>
              </Link>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Sidebar Drawer */}
      <SidebarDrawer
        drawerWidth={drawerWidth}
        open={open}
        routes={routes}
        handleCloseDrawer={handleCloseDrawer}
      />
    </>
  );
};

export default Sidebar;
