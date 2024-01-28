import React, { useState, useEffect, useContext } from "react";
import { Box, Link, Typography } from "@mui/material";
import Image from "next/image";
import SampleProduct from "../assets/images/sample_product.png";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useGlobalProducts } from "@/context/productList";
import { useLoader } from "@/context/loaderContext";

interface MyData {
  id: string;
  productName: string;
  productPrice: number;
}
const API_URL = "http://localhost:3000/api/getAll";
const baseURL = "http://localhost:5000";

const Products = () => {
  // const customers = useContext(MyContext);
  const { products, randomProducts } = useGlobalProducts();
  const [customers, setCustomers] = useState<MyData[]>([]);
  const [editcustomers, setEditCustomers] = useState<MyData[]>([]);
  const [editName, setEditName] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [userId, setId] = useState("");
  const router = useRouter();
  const {goToSingleProduct} = useLoader()

  const getData = async (url: string) => {
    try {
      const res = await fetch(`${baseURL}/products`);
      const myData = await res.json();

      setCustomers(myData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(API_URL);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${baseURL}/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCustomers((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.log("Cannot Delete => ", error);
    }
  };

  const addData = async () => {
    try {
      await fetch(`${baseURL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: "Alish",
          mobile: 9896803282,
        }),
      });
      getData(API_URL);
    } catch (error) {
      console.log("Cannot add data ", error);
    }
  };
  const editData = async (id: string) => {
    try {
      await fetch(`${baseURL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: editName,
          mobile: editNumber,
        }),
      });
      getData(API_URL);
      handleClose();
    } catch (error) {
      console.log("Cannot add data ", error);
    }
  };

  //Dialogue to be removed'
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id: string) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className="mt-[90px] mb-[125px] max-w-[1111px] m-auto">
      <Box className="text-center mb-[60px]">
        <Typography
          className="text-[40px] text-blue-[800] font-medium mb-4"
          // onClick={() => addData()}
        >
          Products
        </Typography>
        <Typography className="text-lg text-grey-[600]">
          Order it for you or for your beloved ones
        </Typography>
      </Box>
      <Box className="grid grid-cols-4 gap-8">
        {randomProducts.map((cus) => {
          return (
            <Box
              className="max-w-[255px] shadow-lg cursor-pointer"
              key={cus._id}
            >
              <Box
                className=" bg-white-[200] flex items-center justify-center"
                onClick={() => goToSingleProduct(cus._id)}
              >
                <Image
                  className="w-[200px]"
                  src={SampleProduct}
                  alt="Sample Product"
                />
              </Box>
              <Box className="bg-white px-6 py-4">
                <Box className="flex items-center gap-2">
                  <Typography className="text-base text-blue-[900] font-medium cursor-pointer">
                    {cus.productName}
                  </Typography>
                  {/* <EditIcon
                    className="cursor-pointer"
                    onClick={() => handleClickOpen(cus.id)}
                  /> */}
                </Box>
                <Typography
                  className="font-xl text-right text-primary"
                  // onClick={() => handleDelete(cus.id)}
                >
                  ${cus.productPrice}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            value={editName}
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setEditName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            value={editNumber}
            id="name"
            label="Mobile"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setEditNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => editData(userId)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
