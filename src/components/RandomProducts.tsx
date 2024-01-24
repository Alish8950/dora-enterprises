import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import SampleProduct from "../assets/images/sample_product.png";
import { useGlobalProducts } from "@/context/productList";
import { useRouter } from "next/navigation";

const RandomProducts = () => {
  const router = useRouter();
  const { popularProducts } = useGlobalProducts();

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
            {popularProducts.map((currElem) => {
              return (
                <Box key={currElem._id} className="max-w-[255px] shadow-lg">
                  <Box className=" bg-white-[200] flex items-center justify-center cursor-pointer"
                  onClick={() => router.push(`/Product/${currElem._id}`)}>
                    <Image
                      className="w-[200px]"
                      src={SampleProduct}
                      alt="Sample Product"
                    />
                  </Box>
                  <Box className="bg-white px-6 py-4 text-left">
                    <Typography className="text-base text-blue-[900] font-medium">
                      {currElem.productName}
                    </Typography>
                    <Typography className="font-xl text-right text-primary">
                      ${currElem.productPrice}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RandomProducts;
