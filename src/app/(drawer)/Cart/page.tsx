"use client";
import React, { useState } from "react";
import { Box, Button, Typography, Link } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import ProductImage from "../../../assets/images/product_image.jpg";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CheckoutDialogue from "@/components/CheckoutDialogue";

export default function Cart() {
  const [quantity, setQuantity] = useState(1);
  const productPrice = 9.99;
  const singleProductTotal = productPrice * quantity;

  //Products Quantity Functions
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const decreaseQuantity = () => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <>
      <Box className="max-w-[1111px] m-auto w-full pt-[47px] pb-[114px]">
        <Box className="text-center">
          <Typography className="text-secondary text-[26px] font-medium">
            Your Cart Items
          </Typography>
          <Link className="text-lg mt-4 block" href="#">
            Back to shopping
          </Link>
        </Box>
        <Box>
          <TableContainer component={Box}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Box className="flex gap-7">
                      <Box className="max-w-[160px]">
                        <Image src={ProductImage} alt="product image" />
                      </Box>
                      <Box>
                        <Typography className="text-[26px] text-secondary mb-5 font-medium">
                          Spiced Mint Candleaf®
                        </Typography>
                        <Link className="text-lg" href="#">
                          Remove
                        </Link>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="left" className="text-lg font-medium">
                    ${productPrice}
                  </TableCell>
                  <TableCell align="left">
                    <Box className="flex items-center border border-primary justify-between w-[75px]">
                      <RemoveIcon
                        className={`text-xl cursor-pointer ${
                          quantity !== 1 ? "text-primary" : "text-grey-[200]"
                        }`}
                        onClick={() => decreaseQuantity()}
                      />
                      <Typography>{quantity}</Typography>
                      <AddIcon
                        className="text-xl text-primary cursor-pointer"
                        onClick={() => increaseQuantity()}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="left" className="text-lg font-medium">
                    ${singleProductTotal}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="text-right mt-7">
            <Typography className="text-xl text-secondary font-medium">
              Sub-total: ${singleProductTotal}
            </Typography>
            {/* <Button className="bg-primary text-white text-xl font-medium h-10 hover:bg-primary px-11 normal-case my-4">
              Check-out
            </Button> */}
            <CheckoutDialogue />
            <Typography className="text-base text-grey-[100] ">
              Tax and shipping cost will be calculated later
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
