import DynamicNavBar from "../components/DynamicNavBar";
import {
  Button,
  Container,
  SimpleGrid,
  Text,
  Icon,
  Center,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
// Iconos importados
import { FaUserFriends, FaUserPlus} from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { TbReceiptOff } from "react-icons/tb";
import { useEffect, useState } from "react";

const simpleGrid = () => {
  const router = useRouter();
  // Funcion para cerrar sesion
  const logout = async () => {
    await axios.get(`${process.env.API_URL}/logout`);
    Cookies.remove("token");
  }
  return (
    <>
      <DynamicNavBar/>
      <Container bg={"#D6E4E5"} margin=" 2rem auto" borderRadius='1rem'>
        <Heading 
        textAlign="center" 
        p={'1rem'}
        textTransform={"uppercase"}
        fontFamily='sans-serif'
        letterSpacing={'3px'}
        >
          Administracion
        </Heading>
        <SimpleGrid 
        columns={[2, null, 3]} 
        spacing="40px" 
        p={"2rem"}
        >
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
            <Icon as={AiFillDollarCircle} boxSize={90}/>
            <Text textTransform={"uppercase"} fontSize={"xl"}>
              Pagos
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
            <Icon as={TbReceiptOff} boxSize={90}/>
            <Text textTransform={"uppercase"} fontSize={"xl"}>
              Pendientes
            </Text>
          </Button>
        </SimpleGrid>
      </Container>
    </>
  );
};


export default simpleGrid;
