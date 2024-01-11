"use client";
import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import BackgroundImage from "../../../assets/images/background_image.jpg";
import Products from "@/components/Products";
import LearnMore from "@/components/LearnMore";
import Testimonials from "@/components/Testimonials";
import PopularProducts from "@/components/PopularProducts";
import { useGlobalUser } from "@/context/authContext";

export default function Home() {
  const {user} = useGlobalUser();
  console.log(user)
  return (
    <>
      <Box>
        <Box className="relative">
          <Box className="w-full max-h-[705px] overflow-hidden">
            <Image
              className="w-full"
              src={BackgroundImage}
              alt="background image"
            />
          </Box>
          <Box className="absolute top-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Box className="bg-white-[200] opacity-80 text-center max-w-[730px] w-full px-[96px] pt-[33px] pb-[63px]">
              <Typography className="text-[40px] font-medium">
                🌱
                <br />
                The nature candle
              </Typography>
              <Typography className="font-lg pb-11">
                All handmade with natural soy wax, Candleaf is a companion for
                all your pleasure moments
              </Typography>
              <Button className="bg-primary text-white text-xl font-medium h-10 hover:bg-primary px-11 normal-case">
                Discover our collection
              </Button>
              <Box></Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Products />
      <LearnMore />
      <Testimonials />
      <PopularProducts />
    </>
  );
}
