import { Container, Table, Tbody, Tr, Heading, Thead, Td, Button } from '@chakra-ui/react'
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const viewUserPay = () => {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${process.env.API_URL}/getUsersPay`);
    setUsers(response.data);
  };

  const showUsersPay = () => {
    return users.map((usuario, index) => {
      return (
        <Tr
          key={usuario._id}
          _hover={{
            background: "rgb( 0 0 0 / 20% )",
          }}
        >
          <Td>{usuario.numeroVivienda}</Td>
          <Td>{usuario.name}</Td>
          <Td>{usuario.rut}</Td>
          <Td>{usuario.correo}</Td>
        </Tr>
      );
    });
  };

  return (
    <Container maxW="container.xl" centerContent marginBottom={"20"}>
      <Heading textAlign="center" my={10} >
        USUARIOS PAGADOS
      </Heading>
      <Table variant={"simple"}>
        <Thead color="white" bgColor={"black"}>
          <Tr
            borderColor={"black"}
            borderWidth="2px"
            textTransform={"uppercase"}
          >
            <Td textAlign="center">Numero Vivienda</Td>
            <Td textAlign="center">Nombre</Td>
            <Td textAlign="center">Rut</Td>
            <Td textAlign="center">Correo</Td>
            <Td textAlign="center">Accion</Td>
          </Tr>
        </Thead>
        <Tbody borderColor={"black"} borderWidth="2px">
          {showUsersPay()}
        </Tbody>
      </Table>
    </Container>
  );
}

export default viewUserPay;
