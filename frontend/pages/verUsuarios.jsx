import DynamicNavBar from "../components/DynamicNavBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Container,
  Heading,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Button,
  Label,
  Flex,
  Avatar,
  TableContainer,
  Center,
} from "@chakra-ui/react";

// Iconos importados
import { AiFillExclamationCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import jwt from "jsonwebtoken";
export default function VerUsuarios() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Verificacion de token.
    const token = cookie.get("token");
    if (!token || token === "undefined") {
      router.push("/");
    } else {
      // Obtencion de los usuarios de la base de datos.
      getUsers();
    }
  }, []);
  const comprobacion = () => {
    const token = cookie.get("token");
    if (token) {
      const decoded = jwt.decode(token, process.env.SECRET_KEY);
      if (decoded.role === "admin") {
        //router.push("/management");
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
  const getUsers = async () => {
    // Obtencion de los usuarios de la base de datos.
    const response = await axios.get(`${process.env.API_URL}/buscarUser`);
    // Seteo de los usuarios obtenidos.
    setUsers(response.data);
  };
  // Funcion para mostrar los usuarios obtenidos de la base de datos.
  const showUsers = () => {

    return users.map((usuario, index) => {
      const token = cookie.get("token")
      const decoded = jwt.decode(token, process.env.SECRET_KEY)
      if (usuario.rut === "11111111-1" || decoded.sub === usuario._id) {
        return
      }
      return (
        <Tr
          key={usuario._id}
          _hover={{
            background: "rgb( 0 0 0 / 05% )",
          }}
        >
          {/* Se muestra el nombre de usuario */}
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
          {/* Se muestra el numero de vivienda de usuario */}
          <Td textAlign={"center"}>{usuario.numeroVivienda}</Td>
          {/* Acciones en el usuario. */}
          <Td
            textAlign="center"
            display={"flex"}
            justifyContent="center"
            gap={{ base: "1rem" }}
          >
            <Button
              title="Más informacion"
              bg={"#b9d1d3"}
              as={AiFillExclamationCircle}
              boxSize={{ base: "50", md: "35" }}
              onClick={() => router.push(`/usuario/${usuario._id}`)}
              _hover={{
                bg: "#4ea39a",
                color: "white",
              }}
            />
            <Button
              title="Eliminar usuario"
              bg={"#b9d1d3"}
              as={FaTrash}
              boxSize={{ base: "50", md: "35" }}
              onClick={() => deletUserConfirmation(usuario._id)}
              _hover={{
                bg: "#8E1113",
                color: "white",
              }}
            />
          </Td>
        </Tr>
      );
    });
  };

  // Funcion para confimar la eliminacion del usuario(id).
  const deletUserConfirmation = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Luego no podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletUser(id);
        Swal.fire({
          title: "Eliminado!",
          text: "El usuario ha sido eliminado",
          icon: "success",
        });
      }
    });
  };

  //Eliminacion del usuario(id).
  const deletUser = async (id) => {
    const response = await axios.delete(
      `${process.env.API_URL}/deleteCascade/` + id
    );
    getUsers();
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
          USUARIOS
        </Heading>
        <TableContainer>
          <Table variant={"unstyled"}>
            <Thead bg={"#b9d1d3"}>
              <Tr fontWeight={"bold"}>
                <Td textAlign={"center"}>Nombre</Td>
                <Td textAlign={"center"}>Nº Vivienda</Td>
                <Td textAlign="center">Accion</Td>
              </Tr>
            </Thead>
            <Tbody bg={"#dae9ea"}>{showUsers()}</Tbody>
          </Table>
        </TableContainer>
        <Center my={"10"}>
          <Button
            colorScheme={"messenger"}
            height={{ base: "5rem", md: "5rem" }}
            width={{ base: "100%", md: "35%" }}
            fontSize="2xl"
            onClick={() => router.back()}
          >
            Volver
          </Button>
        </Center>
      </Container>
    </>
  );
}
