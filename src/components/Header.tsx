"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Link, Typography } from "@mui/material";
import Image from "next/image";
import EcomLogo from "../assets/images/ecom_logo.svg";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/navigation";
import { useGlobalCart } from "@/context/cartContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useGlobalUser } from "@/context/authContext";
import { useLoader } from "@/context/loaderContext";

const options = ["None", "Atria", "Callisto"];
const ITEM_HEIGHT = 48;

const Header = () => {
  const router = useRouter();
  const { cart, getCart, quantitys } = useGlobalCart();
  const { userData, setUserData, handleSignOut } = useGlobalUser();
  const {goToCart, goToHome, goToOrders} = useLoader()
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorProfile, setAnchorProfile] = React.useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorEl);
  const openProfile = Boolean(anchorProfile);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorProfile(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseProfile = () => {
    setAnchorProfile(null);
  };

  const handleSignoutButton = () => {
    handleCloseProfile();
    handleSignOut();
  };
  useEffect(() => {
    // getCart();
  }, [quantitys]);
  useEffect(() => {
    let totalQuantity = cart.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
    setTotalQuantity(totalQuantity);
  }, [cart]);
  return (
    <>
      <Box className="sticky top-0 bg-white z-10 border-b border-green-[100]">
        <Box className="flex justify-between items-center max-w-[77%] m-auto h-[75px]">
          <Box className="cursor-pointer" onClick={() => goToHome()}>
            <Image src={EcomLogo} alt="logo" />
          </Box>
          <Box className="flex items-center gap-4">
            <Box>
              <Box
                className="flex items-center gap-1 cursor-pointer"
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Typography className="text-secondary text-base">
                  Discovery
                </Typography>
                <KeyboardArrowDownIcon />
              </Box>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={handleClose}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Link
              className="text-secondary text-base"
              underline="none"
              href="/About"
            >
              About
            </Link>
            <Link
              className="text-secondary text-base"
              underline="none"
              href="ContactUs"
            >
              Contact us
            </Link>
          </Box>
          <Box className="flex items-center flex-between gap-4">
            <Box>
              <Box className="cursor-pointer" onClick={handleClickProfile}>
                {userData?.uid ? (
                  <Box>
                    <Avatar
                      className="w-6 h-6"
                      alt={userData?.displayName}
                      src={userData?.photoURL}
                    />
                  </Box>
                ) : (
                  <Person4OutlinedIcon />
                )}
              </Box>
              <Menu
                id="long-menu"
                aria-label="more"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorProfile}
                open={openProfile}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "26ch",
                  },
                  
                }}
              >
                <Box padding="0 10px">
                  {userData?.uid ? (
                    <Box>
                      <Box>
                        <Avatar
                          alt={userData?.displayName}
                          src={userData?.photoURL}
                        />
                      </Box>
                      <Typography className="mb-1">
                        {userData?.displayName}
                      </Typography>
                      <Typography className="mb-2">
                        {userData?.email}
                      </Typography>
                      <Button
                        className="bg-primary w-full text-white text-sm font-medium h-7 hover:bg-primary px-4 normal-case"
                        onClick={() => handleSignoutButton()}
                      >
                        Signout
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      <Button
                        className="bg-primary w-full text-white text-sm font-medium h-7 hover:bg-primary px-4 normal-case"
                        onClick={() => router.push("/Login")}
                      >
                        Signin
                      </Button>
                    </Box>
                  )}
                </Box>
              </Menu>
            </Box>
            <Box className="relative">
              <ShoppingCartOutlinedIcon
                className="cursor-pointer"
                onClick={() => goToCart()}
              />
              {totalQuantity ? (
                <Box className="absolute top-0 bg-primary text-white flex items-center justify-center top-[-7px] right-[-6px] w-4 h-4 min-w-4 rounded-full text-[10px]">
                  {totalQuantity}
                </Box>
              ) : (
                ""
              )}
            </Box>
            <Box>
              <ListAltIcon
                className="cursor-pointer"
                onClick={() => goToOrders()}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
