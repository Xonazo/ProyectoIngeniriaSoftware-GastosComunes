import DynamicNavBar from "../components/DynamicNavBar";
import {
  Button,
  Container,
  SimpleGrid,
  Text,
  Icon,
  Center,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
// Iconos importados
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import { FaUserClock, FaUserTimes } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";

import { useEffect, useState } from "react";

const simpleGrid = () => {
  const router = useRouter();
  // Funcion para cerrar sesion
  const logout = async () => {
    await axios.get(`${process.env.API_URL}/logout`);
    Cookies.remove("token");
  };
  return (
    <>
      <DynamicNavBar/>
      <Container bg={"#D6E4E5"} margin=" 2rem auto" borderRadius="1rem">
        <Heading
          textAlign="center"
          p={"1rem"}
          textTransform={"uppercase"}
          fontFamily="sans-serif"
          letterSpacing={"3px"}
        >
          Administracion
        </Heading>
        <SimpleGrid columns={[2, null, 3]} spacing="40px" p={"2rem"}>
          <Button
            display={"flex"}
            flexDirection="column"
            height={"max-content"}
            maxWidth="max-content"
            p={"2rem"}
            _hover={{
              bg: "teal",
              color: "white",
            }}
            onClick={() => router.push("/crearUsuario")}
          >
            <Icon as={FaUserPlus} boxSize={90} />
            <Text textTransform={"uppercase"} fontSize={"xl"}>
              Crear usuario
            </Text>
          </Button>
          <Button
            display={"flex"}
            flexDirection="column"
            height={"max-content"}
            maxWidth="max-content"
            p={"2rem"}
            _hover={{
              bg: "teal",
              color: "white",
            }}
            onClick={() => router.push("/verUsuarios")}
          >
            <Icon as={FaUserFriends} boxSize={90} />
            <Text textTransform={"uppercase"} fontSize={"xl"}>
              Usuarios
            </Text>
          </Button>
          <Button
            display={"flex"}
            flexDirection="column"
            height={"max-content"}
            maxWidth="max-content"
            p={"2rem"}
            _hover={{
              bg: "teal",
              color: "white",
            }}
          >
            <Icon as={MdLibraryBooks} boxSize={90} />
            <Text textTransform={"uppercase"} fontSize={"xl"}>
              Historial
            </Text>
          </Button>
          <Button
            display={"flex"}
            flexDirection="column"
            height={"max-content"}
            maxWidth="max-content"
            p={"2rem"}
            _hover={{
              bg: "teal",
              color: "white",
            }}
          >
            <Icon as={FaUserClock} boxSize={90} />
            <Text textTransform={"uppercase"} fontSize={"xl"}>
              Por confirmar
            </Text>
          </Button>
          <Button
            display={"flex"}
            flexDirection="column"
            height={"max-content"}
            maxWidth="max-content"
            p={"2rem"}
            _hover={{
              bg: "teal",
              color: "white",
            }}
            onClick={() => router.push("/pagosPendientes")}
          >
            <Icon as={FaUserTimes} boxSize={90} />
            <Text textTransform={"uppercase"} fontSize={"xl"}>
              Pendientes
            </Text>
          </Button>
          <Button
            display={"flex"}
            flexDirection="column"
            height={"max-content"}
            maxWidth="max-content"
            p={"2rem"}
            _hover={{
              bg: "teal",
              color: "white",
            }}
            onClick={() => router.push("/verDeudas")}
          >
            <Icon as={IoWallet} boxSize={90} />
            <Text textTransform={"uppercase"} fontSize={"xl"}>
              Deudas
            </Text>
          </Button>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default simpleGrid;
