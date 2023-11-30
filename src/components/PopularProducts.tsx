import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import SampleProduct from "../assets/images/sample_product.png";

const PopularProducts = () => {
  return (
    <>
      <Box>
        <Box className="py-[90px] text-center max-w-[1111px] m-auto">
          <Typography className="text-blue-[800] text-[40px] font-medium">
            Popular
          </Typography>
          <Typography className="text-grey-[600] text-lg font-medium mt-5 mb-8">
            Our top selling product that you may like
          </Typography>
          <Box className="grid grid-cols-4 gap-8">
            <Box className="max-w-[255px] shadow-lg">
              <Box className=" bg-white-[200] flex items-center justify-center">
                <Image
                  className="w-[200px]"
                  src={SampleProduct}
                  alt="Sample Product"
                />
              </Box>
              <Box className="bg-white px-6 py-4">
                <Typography className="text-base text-blue-[900] font-medium">
                  Spiced Mint
                </Typography>
                <Typography className="font-xl text-right text-primary">
                  9.99$
                </Typography>
              </Box>
            </Box>
            <Box className="max-w-[255px] shadow-lg">
              <Box className=" bg-white-[200] flex items-center justify-center">
                <Image
                  className="w-[200px]"
                  src={SampleProduct}
                  alt="Sample Product"
                />
              </Box>
              <Box className="bg-white px-6 py-4">
                <Typography className="text-base text-blue-[900] font-medium">
                  Spiced Mint
                </Typography>
                <Typography className="font-xl text-right text-primary">
                  9.99$
                </Typography>
              </Box>
            </Box>
            <Box className="max-w-[255px] shadow-lg">
              <Box className=" bg-white-[200] flex items-center justify-center">
                <Image
                  className="w-[200px]"
                  src={SampleProduct}
                  alt="Sample Product"
                />
              </Box>
              <Box className="bg-white px-6 py-4">
                <Typography className="text-base text-blue-[900] font-medium">
                  Spiced Mint
                </Typography>
                <Typography className="font-xl text-right text-primary">
                  9.99$
                </Typography>
              </Box>
            </Box>
            <Box className="max-w-[255px] shadow-lg">
              <Box className=" bg-white-[200] flex items-center justify-center">
                <Image
                  className="w-[200px]"
                  src={SampleProduct}
                  alt="Sample Product"
                />
              </Box>
              <Box className="bg-white px-6 py-4">
                <Typography className="text-base text-blue-[900] font-medium">
                  Spiced Mint
                </Typography>
                <Typography className="font-xl text-right text-primary">
                  9.99$
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PopularProducts;
