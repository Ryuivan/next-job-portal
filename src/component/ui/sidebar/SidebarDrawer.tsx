import { ChevronLeft } from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton } from "@mui/material";
import { Route } from "./Sidebar";
import { useAuth } from "@/hooks/useAuth";
import SidebarLink from "./SidebarLink";

type SidebarDrawerProps = {
  open: boolean;
  drawerWidth: number;
  routes: Route[];
  employerRoutes: Route[];
  jobseekerRoutes: Route[];
  handleCloseDrawer: () => void;
};

const SidebarDrawer = ({
  open,
  drawerWidth,
  routes,
  employerRoutes,
  jobseekerRoutes,
  handleCloseDrawer,
}: SidebarDrawerProps) => {
  const { state } = useAuth();
  const { isAuthenticated, user } = state;

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
          <SidebarLink
            name={name}
            href={href}
            icon={icon}
            handleCloseDrawer={handleCloseDrawer}
            key={href}
          />
        ))}
        {isAuthenticated &&
          user?.role === "employer" &&
          employerRoutes.map(({ name, href, icon }: Route) => (
            <SidebarLink
              name={name}
              href={href}
              icon={icon}
              handleCloseDrawer={handleCloseDrawer}
              key={href}
            />
          ))}

        {isAuthenticated &&
          user?.role === "jobseeker" &&
          jobseekerRoutes.map(({ name, href, icon }: Route) => (
            <SidebarLink
              name={name}
              href={href}
              icon={icon}
              handleCloseDrawer={handleCloseDrawer}
              key={href}
            />
          ))}
      </Box>
    </Drawer>
  );
};

export default SidebarDrawer;
