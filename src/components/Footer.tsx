import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import LogoWhite from "../assets/images/logo_white.png"

const Footer = () => {
  
  return (
    <>
      <Box className='bg-secondary'>
        <Box className="pt-[60px] pb-[115px] text-center max-w-[1111px] m-auto">
            <Divider className="border-white border-2"/>
          <Box className='flex justify-between mt-4'>
            <Box>
                <Box className='pb-4'>
                    <Image src={LogoWhite} alt='logo'/>
                </Box>
                <Typography className="max-w-[250px] text-white text-base">Your natural candle made for your home and for your wellness.</Typography>
            </Box>
            <Box className='grid grid-cols-3'>
                <Box className='flex flex-col gap-6'>
                    <Typography className="text-primary text-base font-medium">Discovery</Typography>
                    <Typography className="text-white-[300] text-base font-medium">New season</Typography>
                    <Typography className="text-white-[300] text-base font-medium">Most searched</Typography>
                    <Typography className="text-white-[300] text-base font-medium">Most selled</Typography>
                </Box>
                <Box className='flex flex-col gap-6'>
                    <Typography className="text-primary text-base font-medium">About</Typography>
                    <Typography className="text-white-[300] text-base font-medium">Help</Typography>
                    <Typography className="text-white-[300] text-base font-medium">Shipping</Typography>
                    <Typography className="text-white-[300] text-base font-medium">Affiliate</Typography>
                </Box>
                <Box className='flex flex-col gap-6'>
                    <Typography className="text-primary text-base font-medium">Info</Typography>
                    <Typography className="text-white-[300] text-base font-medium">Contact us</Typography>
                    <Typography className="text-white-[300] text-base font-medium">Contact us</Typography>
                    <Typography className="text-white-[300] text-base font-medium">Terms & Conditions</Typography>
                </Box>
            </Box>
          </Box>
        </Box>
        
      </Box>
    </>
  );
};

export default Footer;
