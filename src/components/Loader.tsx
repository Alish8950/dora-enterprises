import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Image from "next/image";
import Bottle from "../assets/images/WineBottle.svg";

const Loader = () => {
  return (
    <>
      <Box className="flex justify-center bg-grey-[700] opacity-60 top-0 left-0 items-center h-screen w-full absolute z-10">
        {/* <CircularProgress /> */}
        <Box className="w-5">
          <Image className="animate-spin" src={Bottle} alt="bottle" />
        </Box>
      </Box>
    </>
  );
};

export default Loader;
