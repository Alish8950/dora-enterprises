"use client";
import React, { useEffect, useState } from "react";
import { useGlobalFilter } from "@/context/filterContext";
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Product, useGlobalProducts } from "@/context/productList";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SampleProduct from "../../../assets/images/sample_product.png";
import SearchIcon from '@mui/icons-material/Search';

export default function ProductsList() {
  const { sorting, sortingValue, setSortingValue, filterProducts, setSearchValue, searchValue } =
    useGlobalFilter();
  const [age, setAge] = useState("lowest");
  // const [newFilterData, setNewFilterData] = useState<Product[]>([]);
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value as string);
    setAge(event.target.value as string);
    setSortingValue(event.target.value as string);
    sorting();
  };

  // useEffect(() => {
  //   setNewFilterData(filterProducts)
  //   console.log(filterProducts)
  // }, [sortingValue]);

  // useEffect(() => {
  //   // console.log(newFilterData)
  // }, [newFilterData, filterProducts])
  return (
    <>
      <Box>
        <Box className="flex justify-between items-center">
          <Box className="flex gap-4 items-center">
            <Typography className="text-2xl text-blue-[800] font-medium">
              Products
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="search..."
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
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
        <Box className="m-auto w-fit">
          <Box className="grid grid-cols-4 gap-8">
            {filterProducts.map((currElem) => {
              return (
                <Box key={currElem._id} className="max-w-[255px] shadow-lg">
                  <Box
                    className=" bg-white-[200] flex items-center justify-center cursor-pointer"
                    onClick={() => router.push(`/Product/${currElem._id}`)}
                  >
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
}
