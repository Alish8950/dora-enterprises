import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LearnMoreImg from "../assets/images/learn_more_img.png";
import AddDummyDataDialogue from "./AddDummyDataDialogue";

const LearnMore = () => {
  return (
    <Box className="bg-white-[200]">
      <Box className="flex items-center justify-between max-w-[1111px] m-auto">
        <Box>
          <Typography className="text-[40px] font-medium max-w-[350px] leading-10">
            Clean and fragrant soy wax
          </Typography>
          <Typography className="text-base text-primary mt-4 mb-9">
            Made for your home and for your wellness
          </Typography>
          <Box className="flex flex-col gap-[10px]">
            <Box className="flex gap-[10px] items-center">
              <CheckCircleOutlineIcon className="text-xl text-black" />
              <Typography className="text-base text-black">
                <span className="font-medium">Eco-sustainable: </span>
                All recyclable materials, 0% CO2 emissions
              </Typography>
            </Box>
            <Box className="flex gap-[10px] items-center">
              <CheckCircleOutlineIcon className="text-xl text-black" />
              <Typography className="text-base text-black">
                <span className="font-medium">Hyphoallergenic: </span>
                100% natural, human friendly ingredients
              </Typography>
            </Box>
            <Box className="flex gap-[10px] items-center">
              <CheckCircleOutlineIcon className="text-xl text-black" />
              <Typography className="text-base text-black">
                <span className="font-medium">Handmade: </span>
                All candles are craftly made with love.
              </Typography>
            </Box>
            <Box className="flex gap-[10px] items-center">
              <CheckCircleOutlineIcon className="text-xl text-black" />
              <Typography className="text-base text-black">
                <span className="font-medium">Long burning: </span>
                No more waste. Created for last long.
              </Typography>
            </Box>
          </Box>
          {/* <Button className="bg-primary text-white text-xl font-medium h-10 hover:bg-primary px-11 normal-case mt-[68px]">Learn More</Button> */}
          <AddDummyDataDialogue />
        </Box>
        <Box>
          <Image src={LearnMoreImg} alt="Learn More Banner" />
        </Box>
      </Box>
    </Box>
  );
};

export default LearnMore;
