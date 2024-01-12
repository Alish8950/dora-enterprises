"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { loginSubmit } from "../../../../firebase";
import Image from "next/image";
import GoogleLogo from "../../../assets/images/google.svg";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "@firebase/auth";
import { auth } from "../../../../firebase";
import { useRouter } from "next/navigation";
import { useGlobalUser } from "@/context/authContext";

const Login = () => {
  const { userData, setUserData, loginSubmit } = useGlobalUser();
  const router = useRouter();
  const provider = new GoogleAuthProvider();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console. log(user);
        setUserData(user)
        router.push("/Home");
        const uid = user.uid;
      } else {
        router.push("/Login");
      }
    });
  }, []);

//   useEffect(() => {
// console.log(userData, "userDatauserDatauserDatauserDatauserDatauserData")
//   },[userData])

  
  return (
    <>
      <Box className="w-full h-[53.5vh] flex justify-center items-center">
        <Button
          className="bg-primary text-white text-xl font-medium h-10 hover:bg-primary px-11 normal-case my-4"
          onClick={() => loginSubmit()}
        >
          <Box className="w-5 mr-2">
            <Image src={GoogleLogo} alt="google" />
          </Box>
          Google Signin
        </Button>
      </Box>
    </>
  );
};

export default Login;
