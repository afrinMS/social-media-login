import React, { useEffect, useState } from "react";
import { Hidden, useMediaQuery, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import Drawer from "./subComponents/drawer/Drawer";
import Appbar from "./subComponents/appbar/Appbar";
import MobileDrawer from "./subComponents/drawer/MobileDrawer";
import MobileAppbar from "./subComponents/appbar/MobileAppbar";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { clearToken, setDecodedToken } from "../../redux/actions/userSlice";

// Define the shape of the decoded token
interface DecodedToken {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

const Layout: React.FC = () => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux store
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
        dispatch(setDecodedToken(decoded)); // Dispatch action to set the decoded token in Redux
      } catch (error) {
        dispatch(clearToken()); // Handle the error by clearing the token
      }
    }
  }, [token, dispatch]);

  useEffect(() => {
    setIsDrawerOpen(isLargeScreen);
  }, [isLargeScreen]);

  const handleToggleDrawer = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const contentStyles = {
    flexGrow: 1, // Allow main content to grow and shrink
    transition: "margin-left 0.2s ease-in-out",
    ml: isDrawerOpen ? { xs: 0, sm: "17rem" } : 0,
  };

  return (
    <>
      <CssBaseline />
      <Box sx={contentStyles}>
        {/* Appbar hides on screen sizes smaller than 600px */}
        <Hidden smDown>
          <Appbar isOpen={isDrawerOpen} onToggleDrawer={handleToggleDrawer} />
        </Hidden>
        {/* MobileAppbar hides on screen sizes larger than 600px */}
        <Hidden smUp>
          <MobileAppbar
            isOpen={isDrawerOpen}
            onToggleDrawer={handleToggleDrawer}
          />
        </Hidden>
        {/* Drawer hides on screen sizes smaller than 600px */}
        <Hidden smDown>
          <Drawer isOpen={isDrawerOpen} onClose={handleToggleDrawer} />
        </Hidden>
        {/* MobileDrawer hides on screen sizes larger than 600px */}
        <Hidden smUp>
          <MobileDrawer isOpen={isDrawerOpen} onClose={handleToggleDrawer} />
        </Hidden>

        <Box
          sx={{
            maxHeight: `calc(100vh - 10vh)`,
            boxSizing: "border-box",
            overflow: "auto",
            maxWidth: "100vw",
        
          }}
        >
          <Outlet  />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
