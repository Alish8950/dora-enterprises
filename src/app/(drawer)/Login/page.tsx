"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { loginSubmit } from "../../../../firebase";
import Image from "next/image";
import GoogleLogo from '../../../assets/images/google.svg'





interface LoginFormData {
  email: string;
  password: string;
}

const initialState: LoginFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>(initialState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <>
      <Box className="w-full h-[53.5vh] flex justify-center items-center">
        <Button className="bg-primary text-white text-xl font-medium h-10 hover:bg-primary px-11 normal-case my-4" onClick={() => loginSubmit()}>
          <Box className="w-5 mr-2">
          <Image src={GoogleLogo} alt="google"/>
          </Box>
          Google Signin
        </Button>
      </Box>
    </>
  );
};

export default Login;
