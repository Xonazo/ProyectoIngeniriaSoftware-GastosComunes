// Componente NavBar importado
import DynamicNavBar from "../components/DynamicNavBar";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import cookie from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import Swal from "sweetalert2";

// Componentes importados de Chakra UI
import {
  Container,
  Heading,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Button,
  Flex,
  Avatar,
  TableContainer,
  Center,
} from "@chakra-ui/react";

// Iconos importados
import { AiFillExclamationCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

export default function VerUsuarios() {
  const router = useRouter();
  const [users, setUsers] = useState([]);


  // Funcion para verificar el rol del usuario.
  const comprobacion = () => {
    const token = cookie.get("token");
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

  // useEffect para volver a comprobar cookies.
  useEffect(() => {
    comprobacion();
    getUsers();
  }, []);

  // Obtencion de los usuarios de la base de datos.
  const getUsers = async () => {
    const response = await axios.get(`${process.env.API_URL}/buscarUser`);
    // Seteo de los usuarios obtenidos.
    setUsers(response.data);
  };
  // Funcion para mostrar los usuarios obtenidos de la base de datos.
  const showUsers = () => {
    // Recorremos los usuarios obtenidos.
    return users.map((usuario, index) => {

      const token = cookie.get("token")
      const decoded = jwt.decode(token, process.env.SECRET_KEY)
      // Verificamos el rol de usuario, si es administrador no se muestra en el listado.
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
          
          <Td textAlign={"center"}>{usuario.numeroVivienda}</Td>
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
