"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import ProductImage from "../../../../assets/images/product_image.jpg";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useGlobalCart } from "@/context/cartContext";
import { useGlobalProducts } from "@/context/productList";

const baseURL = "http://localhost:5000";

export default function Product({
  params,
}: {
  params: { ProductDetails: string };
}) {
  const { getSingleProduct, singleProduct } = useGlobalProducts();
  const { cart, addItemToCart, updateItemQuantity } = useGlobalCart();
  // const [availStock, setAvailStock] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [subscriptionDuration, setSubscriptionDuration] = useState("4");

  const existingItem = cart.find((item) => item.id === params.ProductDetails);

  useEffect(() => {
    getSingleProduct(params.ProductDetails);
  }, []);

  // const checkStock = () => {
  //   if (!singleProduct?.stock) {
  //     setAvailStock(true)
  //   } else {
  //     setAvailStock(false)
  //   }
  //   console.log(availStock)
  // };

  // useEffect(() => {
  //   checkStock();
  // }, [singleProduct?.stock]);

  useEffect(() => {
    getSingleProduct(params.ProductDetails);
    // Reset quantity to 1 or a default value whenever the product changes
    setQuantity(1);
  }, [params.ProductDetails]);

  //Weeks duration select
  const handlesubsDuration = (event: SelectChangeEvent) => {
    setSubscriptionDuration(event.target.value as string);
  };

  //Products Quantity Functions
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const decreaseQuantity = () => {
    if (quantity === 0) {
      return;
    } else {
      setQuantity((prev) => prev - 1);
    }
  };
  // const increaseQuantity = () => {
  //   if (singleProduct?.stock !== undefined && quantity < singleProduct?.stock) {
  //     setQuantity((prev) => prev + 1);
  //   }
  // };
  // const decreaseQuantity = () => {
  //   if (quantity === 1) {
  //     return;
  //   } else {
  //     setQuantity((prev) => prev - 1);
  //   }
  // };

  // const updateProductStock = async (id: string) => {
  //   console.log(singleProduct?.stock !== undefined);
  //   try {
  //     if (singleProduct?.stock !== undefined) {
  //       await fetch(`http://localhost:5000/products/${id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           ...singleProduct,
  //           stock: singleProduct.stock - quantity,
  //         }),
  //       });
  //       console.log("it is working");
  //     }
  //   } catch (error) {
  //     console.log("can't update stock=>", error);
  //   }
  // };

  const addOrUpdate = () => {
    if (existingItem) {
      updateItemQuantity(existingItem.id, quantity, existingItem, false);
    } else {
      if (singleProduct?.productName !== undefined) {
        addItemToCart(
          params.ProductDetails,
          singleProduct?.productName,
          singleProduct?.productPrice,
          quantity,
          "testImage"
        );
      }
    }
  };

  // const addOrUpdate = () => {
  //   if (existingItem) {
  //     if (singleProduct?.stock !== undefined) {
  //       updateItemQuantity(
  //         existingItem.id,
  //         quantity,
  //         existingItem,
  //         false,
  //         singleProduct?.stock
  //       );
  //     }
  //     updateProductStock(params.ProductDetails);
  //   } else {
  //     if (singleProduct?.productName !== undefined) {
  //       console.log("lajkdfhjka");
  //       addItemToCart(
  //         params.ProductDetails,
  //         singleProduct?.productName,
  //         singleProduct?.productPrice,
  //         quantity,
  //         "testImage",
  //         singleProduct?.stock
  //       );
  //       updateProductStock(params.ProductDetails);
  //     }
  //   }
  // };

  return (
    <>
      <Box className="max-w-[1111px] m-auto flex gap-[30px] w-full pt-[47px] pb-[114px]">
        <Box>
          <Box className="w-[540px]">
            <Image src={ProductImage} className="w-full" alt="product image" />
          </Box>
          <Box className="text-center mt-4">
            <Typography className="text-xl font-medium text-secondary max-w-[540px] mb-4">
              All hand-made with natural soy wax, Candleaf is made for your
              pleasure moments.
            </Typography>
            <Typography className="text-primary text-[22px] font-medium">
              🚚 FREE SHIPPING
            </Typography>
          </Box>
        </Box>
        <Box className="w-full">
          <Box>
            <Typography className="text-secondary text-[26px] font-medium mb-4">
              {singleProduct?.productName}
            </Typography>
            <Box className="flex justify-between w-full">
              <Box>
                <Typography className="text-primary font-medium text-[26px] mb-8">
                  ${singleProduct?.productPrice}
                </Typography>
                <Box>
                  <Typography className="mb-2">Quantity</Typography>
                  <Box className="flex items-center border border-primary justify-between w-[65px]">
                    <RemoveIcon
                      className={`text-xl cursor-pointer ${
                        quantity - 1 ? "text-primary" : "text-grey-[200]"
                      }`}
                      onClick={() => decreaseQuantity()}
                    />
                    <Typography>{quantity}</Typography>
                    <AddIcon
                      className="text-xl text-primary cursor-pointer"
                      onClick={() => increaseQuantity()}
                    />
                  </Box>
                </Box>
              </Box>
              <Box className="max-w-[350px]">
                <Box className="mb-[67px]">
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        className="ml-1"
                        value="female"
                        control={<Radio />}
                        label="One time purchase"
                      />
                      <Box className="border border-grey-[300] rounded-lg py-[18px] px-3">
                        <Box className="flex items-center">
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Subscribe and delivery every "
                          />
                          <Box className="min-w-[95px]">
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                value={subscriptionDuration}
                                displayEmpty
                                onChange={handlesubsDuration}
                                IconComponent={() => <KeyboardArrowDownIcon />}
                              >
                                <MenuItem value={2}>2 Weeks</MenuItem>
                                <MenuItem value={4}>4 Weeks</MenuItem>
                                <MenuItem value={6}>6 Weeks</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                        <Box>
                          <Typography className="text-grey-[400] text-sm">
                            Subscribe now and get the 10% of discount on every
                            recurring order. The discount will be applied at
                            checkout.
                            <a href="/Home" className="text-primary text-base">
                              See details
                            </a>
                          </Typography>
                        </Box>
                      </Box>
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Button
                  className="bg-primary text-white text-xl font-medium h-10 hover:bg-primary px-11 normal-case w-full"
                  // disabled={!singleProduct?.stock ? true : false}
                  onClick={addOrUpdate}
                  startIcon={
                    <ShoppingCartOutlinedIcon className="text-white" />
                  }
                >
                  Add to cart
                </Button>
              </Box>
            </Box>
            <Box className="border border-grey-[300] mt-10 rounded-lg p-5 w-fit">
              <Typography>Key Features</Typography>
              <Typography className="text-base text-green-[200]">
                <span className="text-grey-[700]">Description: </span>
                {singleProduct?.alcoholDescription}
              </Typography>
              <Typography className="text-base text-green-[200]">
                <span className="text-grey-[700]">Quantity: </span>
                {singleProduct?.quantity}
              </Typography>
              <Typography className="text-base text-green-[200]">
                <span className="text-grey-[700]">Alcohol Percentage: </span>
                {singleProduct?.alcoholPercentage}%
              </Typography>
              <Box className="flex justify-between items-center max-w-[540px]"></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
