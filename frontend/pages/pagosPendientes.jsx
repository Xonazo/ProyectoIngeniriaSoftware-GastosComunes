// Componente NavBar importado
import DynamicNavBar from "../components/DynamicNavBar";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";

// Componentes importados de Chakra UI
import {
  Box,
  Container,
  Heading,
  Table,
  Td,
  Thead,
  Tr,
  Tbody,
  Button,
  Center,
  Flex,
  Avatar,
} from "@chakra-ui/react";

// Iconos importados
import { AiFillNotification, AiFillExclamationCircle } from "react-icons/ai";


const UsersNoPay = () => {
  const router = useRouter();

  // Inicializamos el estado de los usuarios.
  const [users, setUsers] = useState([]);

  // useEffect para volver a comprobar cookies y obtener usuarios.
  useEffect(() => {
    comprobacion();
    getUsers();
  }, []);

  // Funcion para obtener los usuarios que no han pagado.
  const getUsers = async () => {
    const response = await axios.get(`${process.env.API_URL}/getUsersNoPay`);
    setUsers(response.data);
  };

   // Funcion para verificar el rol del usuario.
  const comprobacion = () => {
    // Obtenemos el token del usuario.
    const token = Cookies.get("token");
    if (token) {
      // Decodificacion del token.
      const decoded = jwt.decode(token, process.env.SECRET_KEY);
      if (decoded.role === "user") {
        router.push("/userManagement");
      }
    } else {
      router.push("/");
    }
  };

  // Funcion para mostrar los usuarios obtenidos
  const showUsers = () => {
    return users.map((usuario, index) => {
      // Si el rol de usuario es admin, no se muestra.
      if (usuario.role === "admin") {
        return;
      }
      return (
        <Tr
          key={usuario._id}
          _hover={{
            background: "rgb( 0 0 0 / 05% )",
          }}
        >
          <Td>
            <Flex alignItems={"center"} justifyContent="center" gap={3}>
              <Avatar
                borderRadius={"50%"}
                borderColor="black"
                borderWidth="1px"
                bg={"#D6E4E5"}
                src={`https://robohash.org/${usuario._id}`}
              />
              <span>{usuario.name}</span>
            </Flex>
          </Td>
          <Td>{usuario.numeroVivienda}</Td>
          <Td display={"flex"} justifyContent="space-around">
            <Button
              title="Notificar"
              bg={"#b9d1d3"}
              as={AiFillNotification}
              boxSize="35"
              cursor={"pointer"}
              onClick={() => notifyUser(usuario._id)}
              _hover={{
                bg: "#4ea39a",
                color: "white",
              }}
            />
            <Button
              title="Más informacion"
              bg={"#b9d1d3"}
              as={AiFillExclamationCircle}
              boxSize={"35"}
              onClick={() => router.push(`/usuario/${usuario._id}`)}
              _hover={{
                bg: "#4ea39a",
                color: "white",
              }}
            />
          </Td>
        </Tr>
      );
    });
  };

  // Funcion para notificar al usuario por id.
  const notifyUser = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/notifyUser/` + id
      );
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          title: "Usuario notificado",
          text: "El usuario ha sido notificado",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          // router.push('/verUsuarios')
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  // Funcion para notificar a todos los usuarios.
  const notify = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/notify`);
      if (response.status === 200) {
        Swal.fire({
          title: "Usuarios notificados",
          text: "Se ha notificado a todos los usuarios",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DynamicNavBar />
      <Container
        bg={"#D6E4E5"}
        margin=" 3rem auto"
        p={"3rem"}
        borderRadius={"1rem"}
      >
        <Heading
          textTransform={"uppercase"}
          textAlign="center"
          marginBottom={"1rem"}
        >
          Pagos pendientes
        </Heading>
        <Table variant="unstyled">
          <Thead bg={"#b9d1d3"}>
            <Tr fontWeight={"bold"}>
              <Td>Nombre </Td>
              <Td>Nº Vivienda </Td>
              <Td textAlign={"center"}>Accion</Td>
            </Tr>
          </Thead>
          <Tbody bg={"#dae9ea"}>{showUsers()}</Tbody>
        </Table>
        <Center marginBlock={"1.5rem"}>
          <Button
            title="Notificar a todos"
            colorScheme={"whatsapp"}
            w="19rem"
            h={"5rem"}
            fontSize="2xl"
            onClick={() => notify()}
          >
            Notificar
          </Button>
        </Center>
      </Container>
    </>
  );
};

export default UsersNoPay;
