"use client";
import React, { useEffect, useState } from "react";
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
import { useGlobalCart } from "@/context/cartContext";
import { Cart as CartInterface } from "../../../context/cartContext";
import { useGlobalOrders } from "@/context/ordersContext";
import { useLoader } from "@/context/loaderContext";

export default function Cart() {
  const {
    cart,
    updateItemQuantity,
    getCart,
    setQuantity,
    quantitys,
    deleteAllItems,
    updatedCart,
    setUpdatedCart,
  } = useGlobalCart();
  const { updateOrders } = useGlobalOrders();
  const totalPrice = cart.reduce((total, currentItem, index) => {
    return total + currentItem.productPrice * quantitys[index];
  }, 0);

  const {setGlobalLoading} = useLoader();

  useEffect(() => {
    setGlobalLoading(false);
    // Create an array of quantities from the cart items
    const quantities = cart.map((item) => item.quantity);

    setUpdatedCart(cart);

    // Update the vals state
    setQuantity(quantities);
  }, [cart]);
  useEffect(() => {
    getCart();
  }, []);

  // Function to increase quantity
  const increaseQuantity = (
    index: number,
    id: string,
    productImage: string,
    productName: string,
    productPrice: number,
    quantity: number
  ) => {
    const existingItem = {
      id,
      productImage,
      productName,
      productPrice,
      quantity,
    };
    setQuantity(
      quantitys.map((qty: any, i: any) => {
        if (i === index) {
          return qty + 1;
        }
        return qty;
      })
    );
    updateItemQuantity(id, quantitys[index] + 1, existingItem, true);
  };
  // Function to decrease quantity
  const decreaseQuantity = (
    index: number,
    id: string,
    productImage: string,
    productName: string,
    productPrice: number,
    quantity: number
  ) => {
    const existingItem = {
      id,
      productImage,
      productName,
      productPrice,
      quantity,
    };
    if (quantitys[index] - 1) {
      setQuantity(
        quantitys.map((qty: any, i: any) => {
          if (i === index && qty > 1) {
            // Prevents quantity from going below 1
            return qty - 1;
          }
          return qty;
        })
      );
      updateItemQuantity(id, quantitys[index] - 1, existingItem, true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/cart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setUpdatedCart((prevData: any) =>
        prevData.filter((item: any) => item.id !== id)
      );
    } catch (error) {
      console.log("Cannot Delete => ", error);
    }
  };

  return (
    <>
      <Box className="max-w-[1111px] m-auto w-full pt-[47px] pb-[114px]">
        <Box className="text-center">
          <Typography className="text-secondary text-[26px] font-medium">
            Your Cart Items
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
                </TableRow>
              </TableHead>
              <TableBody>
                {updatedCart.map((cart: any, index: number) => {
                  return (
                    <TableRow key={cart.id}>
                      <TableCell component="th" scope="row">
                        <Box className="flex gap-7">
                          <Box className="max-w-[160px]">
                            <Image src={ProductImage} alt="product image" />
                          </Box>
                          <Box>
                            <Typography className="text-[26px] text-secondary mb-5 font-medium">
                              {cart.productName}
                            </Typography>
                            <Link
                              className="text-lg cursor-pointer"
                              onClick={() => handleDelete(cart.id)}
                            >
                              Remove
                            </Link>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="left" className="text-lg font-medium">
                        ${cart.productPrice}
                      </TableCell>
                      <TableCell align="left">
                        <Box className="flex items-center border border-primary justify-between w-[75px]">
                          <RemoveIcon
                            className={`text-xl cursor-pointer ${
                              quantitys[index] !== 1
                                ? "text-primary"
                                : "text-grey-[200]"
                            }`}
                            onClick={() =>
                              decreaseQuantity(
                                index,
                                cart.id,
                                cart.productImage,
                                cart.productName,
                                cart.productPrice,
                                quantitys[index]
                              )
                            }
                          />
                          <Typography>{quantitys[index]}</Typography>
                          <AddIcon
                            className="text-xl text-primary cursor-pointer"
                            onClick={() =>
                              increaseQuantity(
                                index,
                                cart.id,
                                cart.productImage,
                                cart.productName,
                                cart.productPrice,
                                quantitys[index]
                              )
                            }
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="left" className="text-lg font-medium">
                        $
                        {Math.round(
                          cart.productPrice * quantitys[index] * 100
                        ) / 100}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="w-full flex items-end justify-end">
            <Link className="cursor-pointer" onClick={deleteAllItems}>
              Clear Cart
            </Link>
          </Box>
          <Box className="text-right mt-7">
            <Typography className="text-xl text-secondary font-medium">
              Sub-total: ${Math.round(totalPrice * 100) / 100}
            </Typography>
            <CheckoutDialogue cart={updatedCart} totalPrice={totalPrice} />
            <Typography className="text-base text-grey-[100] ">
              Tax and shipping cost will be calculated later
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
