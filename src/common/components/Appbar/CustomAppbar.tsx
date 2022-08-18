import { AppBar, AppBarProps, Toolbar, ToolbarProps } from "@mui/material";
import { ReactNode } from "react";

export interface CustomAppbarProps {
  children: ReactNode;
  appbarProps?: AppBarProps;
  toolbarProps?: ToolbarProps;
}

export const CustomAppbar = ({
  children,
  appbarProps,
  toolbarProps,
}: CustomAppbarProps) => {
  return (
    <AppBar position="static" {...appbarProps}>
      <Toolbar {...toolbarProps}>{children}</Toolbar>
    </AppBar>
  );
};
