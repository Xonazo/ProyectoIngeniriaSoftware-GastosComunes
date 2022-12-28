import DynamicNavBar from "../components/DynamicNavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
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
} from "@chakra-ui/react";
import { AiFillNotification, AiFillExclamationCircle } from "react-icons/ai";
import Swal from "sweetalert2";

const UsersNoPay = () => {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${process.env.API_URL}/getUsersNoPay`);
    setUsers(response.data);
  };

  const showUsers = () => {
    return users.map((usuario, index) => {
      return (
        <Tr
          key={usuario._id}
          _hover={{
            background: "rgb( 0 0 0 / 05% )",
          }}
        >
          <Td>{usuario.name}</Td>
          <Td>{usuario.numeroVivienda}</Td>
          <Td display={"flex"} justifyContent="space-around">
            <Button
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
      </Container>
    </>
  );
};

export default UsersNoPay;
