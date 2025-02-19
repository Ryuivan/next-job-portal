import { ChevronLeft } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Route } from "./Sidebar";
import Link from "next/link";

type SidebarDrawerProps = {
  open: boolean;
  drawerWidth: number;
  routes: Route[];
  handleCloseDrawer: () => void;
};

const SidebarDrawer = ({
  open,
  drawerWidth,
  routes,
  handleCloseDrawer,
}: SidebarDrawerProps) => {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={handleCloseDrawer}
    >
      {/* Header Drawer */}
      <Box
        sx={{
          width: drawerWidth,
          display: "flex",
          justifyContent: "flex-end",
          padding: "12px",
        }}
        role="presentation"
      >
        <IconButton onClick={handleCloseDrawer} color="inherit">
          <ChevronLeft />
        </IconButton>
      </Box>

      <Divider />

      {/* Navigasi Menu */}
      <Box component="nav">
        {routes.map(({ name, href, icon }: Route) => (
          <ListItem key={href}>
            <ListItemButton component={Link} href={href}>
              <ListItemIcon>{icon}</ListItemIcon>
              <Typography fontWeight={500}>{name}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </Box>
    </Drawer>
  );
};

export default SidebarDrawer;
