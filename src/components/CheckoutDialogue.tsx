"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  Divider,
  Link,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Logo from "../assets/images/ecom_logo.svg";
import FormLabel from "@mui/material/FormLabel";
import Image from "next/image";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CheckoutDialogue = () => {
  // Dialogue Box State
  const [open, setOpen] = useState(false);
  // Custom Stepper State
  const [stepper, setStepper] = useState(2);
  // Country Select State
  const [selectCountry, setSelectCountry] = useState("");

  // Dialogue Functions
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // Country Select function
  const SelectCountry = (event: SelectChangeEvent) => {
    setSelectCountry(event.target.value as string);
  };
  useEffect(() => {
    console.log(stepper);
  }, [stepper]);

  // Custom Stepper Functions
  const handleNextStep = () => {
    if (stepper >= 4) {
      return;
    } else {
      setStepper((prevStep) => prevStep + 1);
    }
  };
  const handlePrevStep = () => {
    if (stepper <= 2) {
      handleClose();
    } else {
      setStepper((prevStep) => prevStep - 1);
    }
  };

  return (
    <>
      <Box>
        <Button
          className="bg-primary text-white text-xl font-medium h-10 hover:bg-primary px-11 normal-case my-4"
          onClick={handleClickOpen}
        >
          Check-out
        </Button>

        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <Box className="flex items-center w-full h-screen">
            <Box className="w-1/2 h-full overflow-auto">
              <Box className="w-[60%] mx-auto">
                <Box className="w-[126px] my-5">
                  <Image src={Logo} alt="logo" />
                </Box>
                <Box className="flex items-center gap-3 mb-11">
                  <Typography className="text-base text-primary font-medium">
                    Cart
                  </Typography>
                  <Typography>&gt;</Typography>
                  <Typography
                    className={`text-base font-medium ${
                      stepper > 2 ? "text-primary" : "text-secondary"
                    }`}
                  >
                    Details
                  </Typography>
                  <Typography>&gt;</Typography>
                  <Typography
                    className={`text-base font-medium ${
                      stepper > 2
                        ? stepper > 3
                          ? "text-primary"
                          : "text-secondary"
                        : "text-grey-[800]"
                    }`}
                  >
                    Shipping
                  </Typography>
                  <Typography>&gt;</Typography>
                  <Typography
                    className={`text-base font-medium ${
                      stepper > 3
                        ? stepper > 4
                          ? "text-primary"
                          : "text-secondary"
                        : "text-grey-[800]"
                    }`}
                  >
                    Payment
                  </Typography>
                </Box>
                <Box>
                  {stepper == 2 && (
                    <>
                      <Box className="flex items-center justify-between">
                        <Typography className="text-xl font-medium text-secondary">
                          Contact
                        </Typography>
                        <Typography>Do you have an account?</Typography>
                      </Box>
                      <TextField
                        variant="outlined"
                        className="w-full mt-3 mb-10"
                        placeholder="Email or mobile phone number"
                        size="medium"
                      />
                      <Box>
                        <Typography className="text-xl font-medium text-secondary">
                          Shipping Address
                        </Typography>
                        <Box className="grid grid-cols-2 gap-4">
                          <TextField
                            variant="outlined"
                            className="w-full mt-3"
                            placeholder="First Name"
                            size="medium"
                          />
                          <TextField
                            variant="outlined"
                            className="w-full mt-3"
                            placeholder="Last Name"
                            size="medium"
                          />
                        </Box>
                        <TextField
                          variant="outlined"
                          className="w-full mt-3"
                          placeholder="Number"
                          size="medium"
                        />
                        <TextField
                          variant="outlined"
                          className="w-full mt-3"
                          placeholder="Address"
                          size="medium"
                        />
                        <Box className="grid grid-cols-3 gap-4">
                          <TextField
                            variant="outlined"
                            className="w-full mt-3"
                            placeholder="Pincode"
                            size="medium"
                          />
                          <TextField
                            variant="outlined"
                            className="w-full mt-3"
                            placeholder="City"
                            size="medium"
                          />
                          <TextField
                            variant="outlined"
                            className="w-full mt-3"
                            placeholder="State"
                            size="medium"
                          />
                        </Box>
                        <FormControl fullWidth className="mt-3">
                          <InputLabel id="demo-simple-select-label">
                            Country
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectCountry}
                            label="Country"
                            onChange={SelectCountry}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <Box className="flex items-center gap-2 mt-2">
                        <Checkbox className="p-0" />
                        <Typography className="text-secondary text-sm">
                          Save this informations for a future fast checkout
                        </Typography>
                      </Box>
                    </>
                  )}
                  {stepper == 3 && (
                    <>
                      <Box className="border border-primary border-opacity-20 py-5 px-7 rounded-lg">
                        <Box className="flex items-center justify-between">
                          <Box className="flex items-center gap-2">
                            <Typography className="text-sm text-grey-[800]">
                              Contact
                            </Typography>
                            <Typography className="text-sm text-secondary">
                              joe.spagnuolo@uxbly.com
                            </Typography>
                          </Box>
                          <Link href="#" className="text-sm no-underline">
                            Edit
                          </Link>
                        </Box>
                        <Divider className="border-primary opacity-20 my-5" />
                        <Box className="flex items-center justify-between">
                          <Box className="flex items-center gap-2">
                            <Typography className="text-sm text-grey-[800]">
                              Ship to
                            </Typography>
                            <Typography className="text-sm text-secondary">
                              Via Firenze 23, 92023, Campobello di Licata AG,
                              Italia
                            </Typography>
                          </Box>
                          <Link href="#" className="text-sm no-underline">
                            Edit
                          </Link>
                        </Box>
                      </Box>
                      <Box className="mt-10">
                        <Typography className="text-xl text-secondary font-medium">
                          Shipping
                        </Typography>
                        <Box className="border border-white-[500] py-3 px-5 rounded-lg mt-6">
                          <FormControl fullWidth>
                            <RadioGroup
                              aria-labelledby="-radio-buttons-group-label"
                              defaultValue="standard"
                              name="radio-buttons-group"
                            >
                              <Box className="flex items-center justify-between">
                                <FormControlLabel
                                  value="standard"
                                  control={<Radio />}
                                  label="Standard Shipping"
                                />
                                <Typography>Free</Typography>
                              </Box>
                              <Divider className="border-primary opacity-20 my-2" />
                              <Box className="flex items-center justify-between">
                                <FormControlLabel
                                  value="premium"
                                  control={<Radio />}
                                  label="One Day Delivery"
                                />
                                <Typography>1200</Typography>
                              </Box>
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </Box>
                    </>
                  )}
                  {stepper == 4 && <Box>Step 4</Box>}
                </Box>
                <Box className="flex items-center justify-between my-16">
                  <Link
                    className="text-lg block cursor-pointer"
                    onClick={handlePrevStep}
                  >
                    {stepper === 2 && "Back to Cart"}
                    {stepper === 3 && "Back to Details"}
                    {stepper === 4 && "Back to Shipping"}
                  </Link>
                  <Button
                    className="bg-primary text-white font-normal text-xl h-10 hover:bg-primary px-11 normal-case whitespace-nowrap"
                    onClick={handleNextStep}
                  >
                    {stepper === 2 && "Go to Shipping"}
                    {stepper === 3 && "Go to payment"}
                    {stepper === 4 && "Pay now"}
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className="w-1/2 bg-white-[400] h-full">
              <Box className="w-[60%] m-auto h-full flex flex-col justify-center">
                <TableContainer component={Paper} elevation={0}>
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left" className="text-lg">
                          Product
                        </TableCell>
                        <TableCell align="left" className="text-lg">
                          Quantity
                        </TableCell>
                        <TableCell align="left" className="text-lg">
                          Total
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          "td, th": { border: 0 },
                        }}
                      >
                        <TableCell align="left" className="text-base">
                          Vodka
                        </TableCell>
                        <TableCell align="left" className="text-base">
                          2
                        </TableCell>
                        <TableCell align="left" className="text-base">
                          1200
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "td, th": { border: 0 },
                        }}
                      >
                        <TableCell align="left" className="text-base">
                          Vodka
                        </TableCell>
                        <TableCell align="left" className="text-base">
                          2
                        </TableCell>
                        <TableCell align="left" className="text-base">
                          1200
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider className="border-primary opacity-20 mt-12" />
                <Box className="flex items-center gap-2 py-7">
                  <TextField
                    variant="outlined"
                    className="w-full bg-white"
                    placeholder="Coupon Code"
                    size="small"
                  />
                  <Button className="bg-primary text-white font-normal text-xl h-10 hover:bg-primary px-11 normal-case whitespace-nowrap">
                    Add Code
                  </Button>
                </Box>
                <Divider className="border-primary opacity-20 mb-4" />
                <Box>
                  <Box className="flex items-center justify-between">
                    <Typography className="text-sm font-medium text-grey-[800]">
                      Subtotal
                    </Typography>
                    <Typography className="text-sm font-medium text-secondary">
                      $9.99
                    </Typography>
                  </Box>
                  <Box className="flex items-center justify-between mt-3">
                    <Typography className="text-sm font-medium text-grey-[800]">
                      Subtotal
                    </Typography>
                    <Typography className="text-sm font-medium text-grey-[800]">
                      Calculated at the next step
                    </Typography>
                  </Box>
                </Box>
                <Divider className="border-primary opacity-20 mb-4 mt-8" />
                <Box className="flex items-center justify-between">
                  <Typography className="text-sm font-medium text-grey-[800]">
                    Total
                  </Typography>
                  <Typography className="text-2xl font-medium text-secondary">
                    $9.99
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </>
  );
};

export default CheckoutDialogue;
