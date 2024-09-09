import React from "react";
import {
  Avatar,
  Box,
  Divider,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import SupportIcon from "@mui/icons-material/Support";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearToken } from "../../../../redux/actions/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Define types for items in the menu
interface MenuItemType {
  text: string;
  icon: JSX.Element;
}

// Define props for ProfileMenuList component
interface ProfileMenuListProps {
  handleClose: () => void;
}

// Define the menu items
const profileSettingItems: MenuItemType[] = [
  { text: "My Profile", icon: <PermIdentityIcon fontSize="inherit" /> },
  { text: "Settings", icon: <SettingsOutlinedIcon fontSize="inherit" /> },
  { text: "Billing", icon: <PaymentOutlinedIcon fontSize="inherit" /> },
];

const faqItems: MenuItemType[] = [
  { text: "Help", icon: <SupportIcon fontSize="inherit" /> },
  { text: "FAQ", icon: <InfoOutlinedIcon fontSize="inherit" /> },
  { text: "Pricing", icon: <AttachMoneyIcon fontSize="inherit" /> },
];

// ProfileMenuList component definition
const ProfileMenuList: React.FC<ProfileMenuListProps> = ({ handleClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.removeItem("token");
    dispatch(clearToken()); // Handle the error by clearing the token
    handleClose(); // Close the menu when signing out
    navigate("/login");
  }

  return (
    <>
      <MenuItem onClick={handleClose}>
        <Avatar />
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          John Doe
          <Typography sx={{ fontSize: "0.7em", color: "gray" }}>
            Admin
          </Typography>
        </Box>
      </MenuItem>
      <Divider />

      {profileSettingItems.map((item) => (
        <MenuItem
          key={item.text}
          onClick={handleClose}
          sx={{ gap: 2, alignItems: "center", pb: 0 }}
        >
          <Box sx={{ color: theme.palette.primary.main, fontSize: "1.2em" }}>
            {item.icon}
          </Box>
          <Typography sx={{ fontSize: "0.8em" }}>{item.text}</Typography>
        </MenuItem>
      ))}
      <Divider />

      {faqItems.map((item) => (
        <MenuItem
          key={item.text}
          onClick={handleClose}
          sx={{ gap: 2, alignItems: "center", pb: 0 }}
        >
          <Box sx={{ color: theme.palette.primary.main, fontSize: "1.2em" }}>
            {item.icon}
          </Box>
          <Typography sx={{ fontSize: "0.8em" }}>{item.text}</Typography>
        </MenuItem>
      ))}
      <Divider />

      <MenuItem
         onClick={handleSignout}
        sx={{ gap: 2, alignItems: "center", pb: 0 }}
      >
        <Box sx={{ color: theme.palette.primary.main, fontSize: "1.2em" }}>
          <LogoutIcon fontSize="inherit" />
        </Box>
        <Typography sx={{ fontSize: "0.8em" }}>Sign Out</Typography>
      </MenuItem>
    </>
  );
};

export default ProfileMenuList;
