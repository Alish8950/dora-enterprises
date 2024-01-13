import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const Loader = () => {
  return (
    <>
      <Box className="flex justify-center bg-grey-[700] opacity-60 top-0 left-0 items-center h-screen w-full absolute z-10">
        <CircularProgress />
      </Box>
    </>
  );
};

export default Loader;
