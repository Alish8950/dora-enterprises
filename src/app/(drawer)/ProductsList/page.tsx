"use client"
import React, { useEffect, useState } from "react";
import { useGlobalFilter } from "@/context/filterContext";
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

export default function ProductsList() {
  const { sorting, sortingValue, setSortingValue } = useGlobalFilter()
  const [age, setAge] = useState('lowest');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    setSortingValue(event.target.value as string)
    sorting();
  };

  useEffect(() => {
    console.log(sortingValue)
  },[age])

  

  return (
    <>
      <Box>
        <Box className="flex justify-between items-center">
          <Typography className="text-2xl text-blue-[800] font-medium">
            Products
          </Typography>
          <FormControl className="max-w-[200px]" fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              value={age}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="lowest">Price: Low to High</MenuItem>
              <MenuItem value="highest">Price: High to Low</MenuItem>
              <MenuItem value="ascending">Ascending Order</MenuItem>
              <MenuItem value="descending">Descending Order</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  );
}
