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
  Image,
  
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
  //COLOCAR EN PAGINAS DE ADMINS
  const comprobacion = () => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwt.decode(token, process.env.SECRET_KEY);
      if (decoded.role === "admin") {
        // router.push("/management");
      }
      if (decoded.role === "user") {
        router.push("/userManagement");
      }
    } else {
      router.push("/");
    }
  };
  useEffect(() => {
    comprobacion();
  }, []);

  const [user, setUser] = useState([]);

  const getUser = async () => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwt.decode(token, process.env.SECRET_KEY);
      const id = decoded.sub;

      const response = await axios.get(
        `${process.env.API_URL}/findOneUser/${id}`
      );
      setUser(response.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const router = useRouter();
  // Funcion para cerrar sesion
  const logout = async () => {
    await axios.get(`${process.env.API_URL}/logout`);
    Cookies.remove("token");
  };
  return (
    <>
      <DynamicNavBar />
      <Container
        bg={"#D6E4E5"}
        margin=" 3rem auto"
        p={"3rem"}
        borderRadius="0.9rem"
      >
        <Heading
          size="xl"
          textTransform={"uppercase"}
          textAlign="center"
          marginBottom={"0.5rem"}
        >
          Bienvenido
        </Heading>
        <Heading
          size="2xl"
          textTransform={"uppercase"}
          textAlign="center"
          marginBottom={"2rem"}
        >
          {user.name}
        </Heading>
        <Center>
          <Image
            bgColor={"white"}
            borderRadius={"full"}
            boxSize="150px"
            src={`https://robohash.org/${user._id}`}
            alt="imagen de usuario"
            marginBottom={"2rem"}
          />
        </Center>
        <Center>
          <Heading size="lg">¿Qué buscas hoy?</Heading>
        </Center>

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
            onClick={() => router.push("/verRegistro")}
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
            onClick={() => router.push("/verImagenes")}
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
              Sin pagar
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
