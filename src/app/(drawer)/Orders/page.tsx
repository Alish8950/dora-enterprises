"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Link } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useGlobalOrders } from "@/context/ordersContext";
import ProductImage from '../../../assets/images/product_image.jpg';
import Image from "next/image";

export default function Orders() {
  const { orders } = useGlobalOrders();

  return (
    <>
      <Box className="max-w-[1111px] m-auto w-full pt-[47px] pb-[114px]">
        <Box className="text-center">
          <Typography className="text-secondary text-[26px] font-medium">
            Your Orders
          </Typography>
          <Link className="text-lg mt-4 block" href="/Home">
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
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => {
                  return (
                    <TableRow key={order.id}>
                      <TableCell component="th" scope="row">
                        <Box className="flex gap-7 items-center">
                          <Box className="max-w-[160px]">
                            <Image src={ProductImage} alt="product image" />
                          </Box>
                          <Box>
                            <Typography className="text-[26px] text-secondary font-medium">
                              {order.productName}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="left" className="text-lg font-medium">
                        ${order.productPrice}
                      </TableCell>
                      <TableCell align="center">
                        <Typography className="mr-7">
                          {order.quantity}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" className="text-lg font-medium">
                        $
                        {Math.round(
                          order.productPrice * order.quantity * 100
                        ) / 100}
                      </TableCell>
                      <TableCell align="left" className="text-lg font-medium">
                        {order.status}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              {/* 
                {updatedCart.map((cart: any, index: number) => {
                  return (
                    <TableRow key={cart.id}>
                      <TableCell component="th" scope="row">
                        <Box className="flex gap-7 items-center">
                          <Box className="max-w-[160px]">
                            <Image src={ProductImage} alt="product image" />
                          </Box>
                          <Box>
                            <Typography className="text-[26px] text-secondary font-medium">
                              {cart.productName}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="left" className="text-lg font-medium">
                        ${cart.productPrice}
                      </TableCell>
                      <TableCell align="center">
                        <Typography className="mr-7">{quantitys[index]}</Typography>
                      </TableCell>
                      <TableCell align="left" className="text-lg font-medium">
                        $
                        {Math.round(
                          cart.productPrice * quantitys[index] * 100
                        ) / 100}
                      </TableCell>
                      <TableCell align="left" className="text-lg font-medium">
                       On the way
                      </TableCell>
                    </TableRow>
                  );
                })}*/}
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
