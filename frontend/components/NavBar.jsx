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

const NavBar = () => {
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
              href="/"
              p="2.3rem"
              _hover={{
                background: "#4ea39a",
              }}
            >
              Inicio
            </Link>
            <Link
              href="/CreateUser"
              p="2.3rem"
              _hover={{
                background: "#4ea39a",
              }}
            >
              Crear Usuario
            </Link>
            <Link
              href="/viewUsers"
              p="2.3rem"
              _hover={{
                background: "#4ea39a",
              }}
            >
              Ver usuarios
            </Link>
            <Link
              href="/UsersNoPay"
              p="2.3rem"
              _hover={{
                background: "#4ea39a",
              }}
            >
              Usuarios sin pagar
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
