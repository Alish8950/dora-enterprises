import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

  const AddDummyDataDialogue = () => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button className="bg-primary text-white text-xl font-medium h-10 hover:bg-primary px-11 normal-case mt-[68px]" onClick={handleClickOpen}>
        Learn More
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth='md' className="w-full">
        <DialogTitle>Add Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add User
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setUserNumber(e.target.value)}
            value={userNumber}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDummyDataDialogue;
