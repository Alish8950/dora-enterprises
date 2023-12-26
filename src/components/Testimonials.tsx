import { Box, Typography } from "@mui/material";
import React from "react";
import DummyProfile from "../assets/images/dummy_profile.png";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { useGlobalTestimonials } from "@/context/testimonialsContext";

const shuffleArray = (array: any) => {
  // Function to shuffle the array randomly
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Testimonials = () => {
  const { testimonials } = useGlobalTestimonials();
  // Shuffle the testimonials array
  const shuffledTestimonials = shuffleArray([...testimonials]);

  // Display only the first 3 items
  const selectedTestimonials = shuffledTestimonials.slice(0, 3);
  // console.log(testimonials, "testimonials");
  return (
    <Box className="bg-primary-light">
      <Box className="py-[90px] text-center max-w-[1111px] m-auto">
        <Typography className="text-blue-[800] text-[40px] font-medium">
          Testimonials
        </Typography>
        <Typography className="text-grey-[600] text-lg font-medium mt-5 mb-8">
          Some quotes from our happy customers
        </Typography>
        <Box className="flex items-center gap-8 justify-center">
          {selectedTestimonials.map((testi: any) => {
            return (
              <Box key={testi.id} className="bg-white max-w-[350px] py-8 flex flex-col justify-center items-center shadow-sm">
                <Image
                  src={DummyProfile}
                  alt="kafh"
                  className="inline-block h-12 w-12 rounded-full"
                />
                <Box className="mt-4 mb-5 flex items-center gap-1">
                {Array.from({ length: testi.rating }, (_, index) => (
                <StarIcon key={index} className="text-primary" />
              ))}
                </Box>
                <Typography className="text-[22px] max-w-[304px] text-blue-[900] mb-2">
                  {testi.comment}
                </Typography>
                <Typography className="text-lg text-grey-[500]">
                  {testi.name}
                </Typography>
              </Box>
            );
          })}
          {/* <Box className="bg-white max-w-[350px] py-8 flex flex-col justify-center items-center shadow-sm">
            <Image
              src={DummyProfile}
              alt="kafh"
              className="inline-block h-12 w-12 rounded-full"
            />
            <Box className="mt-4 mb-5 flex items-center gap-1">
              <StarIcon className="text-primary" />
              <StarIcon className="text-primary" />
              <StarIcon className="text-primary" />
              <StarIcon className="text-primary" />
              <StarIcon className="text-primary" />
            </Box>
            <Typography className="text-[22px] max-w-[304px] text-blue-[900] mb-2">
              “I love it! No more air fresheners”
            </Typography>
            <Typography className="text-lg text-grey-[500]">Luisa</Typography>
          </Box>
          <Box className="bg-white max-w-[350px] py-8 flex flex-col justify-center items-center shadow-sm">
            <Image
              src={DummyProfile}
              alt="kafh"
              className="inline-block h-12 w-12 rounded-full"
            />
            <Box className="mt-4 mb-5 flex items-center gap-1">
              <StarIcon className="text-primary" />
              <StarIcon className="text-primary" />
              <StarIcon className="text-primary" />
              <StarIcon className="text-primary" />
              <StarIcon className="text-primary" />
            </Box>
            <Typography className="text-[22px] max-w-[304px] text-blue-[900] mb-2">
              “I love it! No more air fresheners”
            </Typography>
            <Typography className="text-lg text-grey-[500]">Luisa</Typography>
          </Box>
          <Box className="bg-white max-w-[350px] py-8 flex flex-col justify-center items-center shadow-sm">
            <Image
              src={DummyProfile}
              alt="kafh"
              className="inline-block h-12 w-12 rounded-full"
            />
            <Box className="mt-4 mb-5 flex items-center gap-1">
              <StarIcon className="text-primary" />
              <StarIcon className="text-primary" />
              <StarIcon className="text-primary" />
              <StarIcon className="text-primary" />
              <StarIcon className="text-primary" />
            </Box>
            <Typography className="text-[22px] max-w-[304px] text-blue-[900] mb-2">
              “I love it! No more air fresheners”
            </Typography>
            <Typography className="text-lg text-grey-[500]">Luisa</Typography>
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Testimonials;
