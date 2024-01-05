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
import { useGlobalProducts } from "@/context/productList";

export default function Cart() {
  const { cart, updateItemQuantity } = useGlobalCart();
  // const { products } = useGlobalProducts();
  const [quantitys, setQuantity] = useState<number[]>([]);
  // const [stockValue, setStockValue] = useState<number[]>([]);
  const totalPrice = cart.reduce((total, currentItem, index) => {
    return total + currentItem.productPrice * quantitys[index];
  }, 0);

  // const cartDictionary = cart.reduce((acc: any, item) => {
  //   acc[item.id] = item;
  //   return acc;
  // }, {});

  // // Map over products and merge with cart data

  // useEffect(() => {
  //   const cartDetails = products
  //     .map((product) => {
  //       // Check if the product is in the cart
  //       if (cartDictionary[product.id]) {
  //         return { ...product, quantity: cartDictionary[product.id].quantity };
  //       }
  //       return null; // or return null/undefined if you don't want products not in the cart
  //     })
  //     .filter((item) => item !== null);

  //   const newStockValue = cartDetails.map((item) => item?.stock ?? 0);
  //   setStockValue(newStockValue)
  //   console.log(newStockValue, "carr");
  // }, [cart, products]);

  useEffect(() => {
    // Create an array of quantities from the cart items
    const quantities = cart.map((item) => item.quantity);

    // Update the vals state
    setQuantity(quantities);
  }, [cart]);

  // Function to increase quantity
  const increaseQuantity = (
    index: number,
    id: string,
    productImage: string,
    productName: string,
    productPrice: number,
    quantity: number
    // stock: number
  ) => {
    const existingItem = {
      id,
      productImage,
      productName,
      productPrice,
      quantity
      // stock,
    };
    console.log(existingItem, "existingItemexistingItem");
    setQuantity(
      quantitys.map((qty, i) => {
        if (i === index) {
          return qty + 1;
        }
        return qty;
      })
    );
    updateItemQuantity(id, quantitys[index] + 1, existingItem, true);
    // setQuantity(
    //   quantitys.map((qty, i) => {
    //     if (i === index && qty < qty + stockValue[index]) {
    //       stockValue[index]--;
    //       return qty + 1;
    //     }
    //     return qty;
    //   })
    // );
    // if (existingItem.stock !== undefined) {
    //   updateItemQuantity(
    //     id,
    //     quantitys[index] + 1,
    //     existingItem,
    //     true,
    //     existingItem.stock
    //   );
    // }
  };
  // Function to decrease quantity
  const decreaseQuantity = (
    index: number,
    id: string,
    productImage: string,
    productName: string,
    productPrice: number,
    quantity: number,
    // stock: number
  ) => {
    const existingItem = {
      id,
      productImage,
      productName,
      productPrice,
      quantity,
      // stock,
    };
    setQuantity(
      quantitys.map((qty, i) => {
        if (i === index && qty > 1) {
          // Prevents quantity from going below 1
          return qty - 1;
        }
        return qty;
      })
    );
    updateItemQuantity(id, quantitys[index] - 1, existingItem, true);
    // setQuantity(
    //   quantitys.map((qty, i) => {
    //     if (i === index && qty > 1) {
    //       stockValue[index]++;
    //       // Prevents quantity from going below 1
    //        return qty - 1;
    //     }
    //     return qty;
    //   })
    // );
    // if (existingItem.stock !== undefined) {
    //   updateItemQuantity(
    //     id,
    //     quantitys[index] - 1,
    //     existingItem,
    //     true,
    //     existingItem.stock
    //   );
    // }
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
                {cart.map((cart, index) => {
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
                            <Link className="text-lg" href="#">
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
                                // cart.stock
                              )
                            }
                            // onClick={() => updateQuantity(cart.id, false)}
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
                                // cart.stock
                              )
                            }
                            // onClick={() => updateQuantity(cart.id, true)}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="left" className="text-lg font-medium">
                        $
                        {Math.round(cart.productPrice * quantitys[index] * 100) /
                          100}
                        {/* {Math.round(
                          cart.productPrice * quantitys[index] * 100
                        ) / 100} */}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="text-right mt-7">
            <Typography className="text-xl text-secondary font-medium">
              Sub-total: ${Math.round(totalPrice * 100) / 100}
            </Typography>
            {/* <Button className="bg-primary text-white text-xl font-medium h-10 hover:bg-primary px-11 normal-case my-4">
              Check-out
            </Button> */}
            <CheckoutDialogue cart={cart} />
            <Typography className="text-base text-grey-[100] ">
              Tax and shipping cost will be calculated later
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
