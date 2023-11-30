import React from "react";
import { Box, Link, Typography } from "@mui/material";
import Image from "next/image";
import SampleProduct from "../assets/images/sample_product.png"

const Products = () => {
  return (
    <Box className="mt-[90px] mb-[125px] max-w-[1111px] m-auto">
      <Box className="text-center mb-[60px]">
        <Typography className="text-[40px] text-blue-[800] font-medium mb-4">
          Products
        </Typography>
        <Typography className="text-lg text-grey-[600]">
          Order it for you or for your beloved ones
        </Typography>
      </Box>
      <Box className="grid grid-cols-4 gap-8">
        <Box className="max-w-[255px] shadow-lg">
            <Box className=" bg-white-[200] flex items-center justify-center">
                <Image className="w-[200px]" src={SampleProduct} alt="Sample Product"/>
            </Box>
            <Box className="bg-white px-6 py-4">
                <Typography className="text-base text-blue-[900] font-medium">Spiced Mint</Typography>
                <Typography className="font-xl text-right text-primary">9.99$</Typography>
            </Box>
        </Box>
        <Box className="max-w-[255px] shadow-lg">
            <Box className=" bg-white-[200] flex items-center justify-center">
                <Image className="w-[200px]" src={SampleProduct} alt="Sample Product"/>
            </Box>
            <Box className="bg-white px-6 py-4">
                <Typography className="text-base text-blue-[900] font-medium">Spiced Mint</Typography>
                <Typography className="font-xl text-right text-primary">9.99$</Typography>
            </Box>
        </Box>
        <Box className="max-w-[255px] shadow-lg">
            <Box className=" bg-white-[200] flex items-center justify-center">
                <Image className="w-[200px]" src={SampleProduct} alt="Sample Product"/>
            </Box>
            <Box className="bg-white px-6 py-4">
                <Typography className="text-base text-blue-[900] font-medium">Spiced Mint</Typography>
                <Typography className="font-xl text-right text-primary">9.99$</Typography>
            </Box>
        </Box>
        <Box className="max-w-[255px] shadow-lg">
            <Box className=" bg-white-[200] flex items-center justify-center">
                <Image className="w-[200px]" src={SampleProduct} alt="Sample Product"/>
            </Box>
            <Box className="bg-white px-6 py-4">
                <Typography className="text-base text-blue-[900] font-medium">Spiced Mint</Typography>
                <Typography className="font-xl text-right text-primary">9.99$</Typography>
            </Box>
        </Box>
        <Box className="max-w-[255px] shadow-lg">
            <Box className=" bg-white-[200] flex items-center justify-center">
                <Image className="w-[200px]" src={SampleProduct} alt="Sample Product"/>
            </Box>
            <Box className="bg-white px-6 py-4">
                <Typography className="text-base text-blue-[900] font-medium">Spiced Mint</Typography>
                <Typography className="font-xl text-right text-primary">9.99$</Typography>
            </Box>
        </Box>
        <Box className="max-w-[255px] shadow-lg">
            <Box className=" bg-white-[200] flex items-center justify-center">
                <Image className="w-[200px]" src={SampleProduct} alt="Sample Product"/>
            </Box>
            <Box className="bg-white px-6 py-4">
                <Typography className="text-base text-blue-[900] font-medium">Spiced Mint</Typography>
                <Typography className="font-xl text-right text-primary">9.99$</Typography>
            </Box>
        </Box>
        <Box className="max-w-[255px] shadow-lg">
            <Box className=" bg-white-[200] flex items-center justify-center">
                <Image className="w-[200px]" src={SampleProduct} alt="Sample Product"/>
            </Box>
            <Box className="bg-white px-6 py-4">
                <Typography className="text-base text-blue-[900] font-medium">Spiced Mint</Typography>
                <Typography className="font-xl text-right text-primary">9.99$</Typography>
            </Box>
        </Box>
        <Box className="max-w-[255px] shadow-lg">
            <Box className=" bg-white-[200] flex items-center justify-center">
                <Image className="w-[200px]" src={SampleProduct} alt="Sample Product"/>
            </Box>
            <Box className="bg-white px-6 py-4">
                <Typography className="text-base text-blue-[900] font-medium">Spiced Mint</Typography>
                <Typography className="font-xl text-right text-primary">9.99$</Typography>
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
