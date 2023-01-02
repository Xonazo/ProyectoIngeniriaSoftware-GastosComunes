import React, { useEffect, useState } from "react";
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
import axios from "axios";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";

const DynamicNavBar = () => {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const token = Cookie.get("token");
    if (!token || token === "undefined") {
      setRole(null);
      setId(null);
    } else {
      const decode = jwt.decode(token);
      setRole(decode.role);
      setId(decode.sub);
    }
  }, []);

  const logout = async () => {
    await axios.get(`${process.env.API_URL}/logout`);
    Cookie.remove("token");
    router.push("/");
  };

  const selectNavBar = (role) => {
    switch (role) {
      case "admin":
        return (
          <Box bg={"#1c1c1c"}>
            <Flex
              maxWidth={"120rem"}
              margin="0 auto"
              direction={{ base: "column", md: "row" }}
              justify={{ base: "center", md: "space-between" }}
            >
              <Link>
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
                  onClick={() => router.push("/management")}
                  p="2.3rem"
                  _hover={{
                    background: "#4ea39a",
                  }}
                >
                  Inicio
                </Link>
                <Link
                  p="2.3rem"
                  _hover={{
                    background: "#4ea39a",
                  }}
                  onClick={() => logout()}
                >
                  Cerrar sesion
                </Link>
              </Flex>
            </Flex>
          </Box>
        );
        break;
      case "user":
        return (
          <Box bg={"#1c1c1c"}>
            <Flex
              maxWidth={"120rem"}
              margin="0 auto"
              direction={{ base: "column", md: "row" }}
              justify={{ base: "center", md: "space-between" }}
            >
              <Link>
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
                  onClick={() => router.push("/userManagement")}
                  p="2.3rem"
                  _hover={{
                    background: "#4ea39a",
                  }}
                >
                  Inicio
                </Link>
                <Link
                  p="2.3rem"
                  _hover={{
                    background: "#4ea39a",
                  }}
                  onClick={() => logout()}
                >
                  Cerrar sesion
                </Link>
              </Flex>
            </Flex>
          </Box>
        );
        break;
      case null:
        return (
          <Box bg={"#1c1c1c"}>
            <Flex
              maxWidth={"120rem"}
              margin="0 auto"
              direction={{ base: "column", md: "row" }}
              justify={{ base: "center", md: "space-between" }}
            >
              <Link>
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
                  onClick={() => router.push("/")}
                  p="2.3rem"
                  _hover={{
                    background: "#4ea39a",
                  }}
                >
                  Inicio
                </Link>
                <Link
                  onClick={() => router.push("/about")}
                  p="2.3rem"
                  _hover={{
                    background: "#4ea39a",
                  }}
                >
                  Sobre nosotros
                </Link>
              </Flex>
            </Flex>
          </Box>
        );
    }
  };
  return <>{selectNavBar(role)}</>;
};
export default DynamicNavBar;
