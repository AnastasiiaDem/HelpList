import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Search from "../components/Search";
import { useAuthContext } from "../context/AuthProvider";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Axios from "../config/axiosConfig";

export default function Home() {
  const { auth } = useAuthContext();

  return (
    <>
      <Header />
      <Box marginTop={15}>
        <Button
          sx={{ display: "block", margin: "10px auto 30px auto", height: "35px", width: "170px", color: "#4c4c4c" }}
          color="inherit"
          component={Link}
          to={"/create"}
          variant="outlined"
        >
          Створити допис
        </Button>
      </Box>

      <Search />
    </>
  );
}
