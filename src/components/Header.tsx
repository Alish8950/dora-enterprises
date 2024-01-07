"use client";
import React, { useEffect, useState } from "react";
import { Box, Link, Typography } from "@mui/material";
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

const options = ["None", "Atria", "Callisto"];
const ITEM_HEIGHT = 48;

const Header = () => {
  const router = useRouter();
  const { cart, getCart, quantitys } = useGlobalCart();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    // getCart();
  },[quantitys]);
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
          <Box className="cursor-pointer" onClick={() => router.push("/Home")}>
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
            <Person4OutlinedIcon />
            <Box className="relative">
              <ShoppingCartOutlinedIcon
                className="cursor-pointer"
                onClick={() => router.push("/Cart")}
              />
              {totalQuantity ? (
                <Box className="absolute top-0 bg-primary text-white flex items-center justify-center top-[-7px] right-[-6px] w-4 h-4 min-w-4 rounded-full text-[10px]">
                  {totalQuantity}
                </Box>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
