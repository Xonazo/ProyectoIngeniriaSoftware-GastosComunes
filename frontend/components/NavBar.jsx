import React from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Link,
  background,
  Stack,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useEffect } from "react";
import Swal from "sweetalert2";
const jwt = require("jsonwebtoken");




const NavBar = (data) => {
  const router = useRouter()

  const comprobacion = () => {
    const token = cookie.get("token")
    const decoded = jwt.decode(token,process.env.SECRET_KEY)
    console.log(decoded)

    if(decoded.role === "admin") {
      router.push("/verUsuarios");
    }
    if (!token || token === "undefined") {
      //router.push('/')
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No estas logueado",
      });
    }
     
  }



  const comprobacion2 = () => {
    const token = cookie.get("token")
    const decoded = jwt.decode(token,process.env.SECRET_KEY)
    console.log(decoded)
    if(decoded.role === "admin") {
      router.push("/CreateUser");
    }
    if (!token || token === "undefined") {
      //router.push('/')
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No estas logueado",
      });
    }
     
  }

  const comprobacion3 = () => {
    const token = cookie.get("token")
    if (token) {
      //router.push('/')
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya estas logueado",
      });
    
    } else {
      router.push("/");
      
    }
    if (!token || token === "undefined") {
      //router.push('/')
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya estas en el inicio",
      });
  }
  }

  return (
    <>
      <Box bg={"#1c1c1c"}>
        <Flex
          maxWidth={"120rem"}
          margin="0 auto"
          direction={{ base: "column", md: "row" }}
          justify={{ base: "center", md: "space-between" }}
        >
          <Link href="/">
            <Center>
              <Image p="1rem" boxSize={"max-content"} src="/logo.svg" />
            </Center>
          </Link>

          <Flex
            direction={{ base: "column", md: "row" }}
            textAlign={{ base: "center" }}
            alignItems={{ md: "center" }}
            fontSize={"1.4rem"}
            color="white"
          >
            <Link
              onClick={() => comprobacion3()}
              p="2.3rem"
              _hover={{
                background: "#4ea39a",
              }}
            >
              Inicio
            </Link>
            <Link
              onClick={() => comprobacion2()}
              p="2.3rem"
              _hover={{
                background: "#4ea39a",
              }}
            >
              Crear Usuario
            </Link>
            <Link
              onClick={() => comprobacion()}
              p="2.3rem"
              _hover={{
                background: "#4ea39a",
              }}
            >
              Ver usuarios
            </Link>


            {/* <Link
              p="2.3rem"
              _hover={{
                background: "#4ea39a",
              }}
            >
              Enlace4
            </Link> */}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
