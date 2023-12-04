"use client";
import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";


const theme = createTheme({
  palette: {
    primary: {
      main: "#56B280",
    },
  },
  components: {
    // Name of the component
    MuiSelect: {
      variants: [
        {
          props: {size: "small"},
          style: {
            "&.MuiOutlinedInput-root": {
              height: "24px",
              ".MuiSelect-select":{
                paddingRight: "0 !important",
                paddingLeft: "8px !important",
                paddingTop: "0",
                paddingBottom: "0"
              },
              ".MuiSvgIcon-root" : {
                right: "0"
              }
            }
          }
        }
      ]
    }
  },
});

export default theme;
