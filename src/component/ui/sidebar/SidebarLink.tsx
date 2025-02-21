import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

type SidebarLinkProps = {
  name: string;
  href: string;
  icon: ReactNode;
  handleCloseDrawer: () => void;
};

const SidebarLink = ({
  name,
  href,
  icon,
  handleCloseDrawer,
}: SidebarLinkProps) => {
  return (
    <ListItem key={href}>
      <ListItemButton component={Link} href={href} onClick={handleCloseDrawer}>
        <ListItemIcon>{icon}</ListItemIcon>
        <Typography fontWeight={500}>{name}</Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarLink;
