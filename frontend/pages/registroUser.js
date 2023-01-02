// NavBar dinamico
import DynamicNavBar from "../components/DynamicNavBar";
import { useEffect, useState } from "react";
import Router from "next/router";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";

// Componentes importados de Chakra UI
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Heading,
  TableContainer,
  Center,
  Button,
} from "@chakra-ui/react";

export const registros = (idUser) => {

  // Inicializamos la informacion del usuario
  const [userInfo, setUserInfo] = useState({
    id: "",
    nombre: "",
    rut: "",
  });

  // Inicializamos los registros
  const [registros, setRegistros] = useState([]);

  const getUserInfo = async () => {
    const token = Cookies.get("token");
    if (!token || token === "" || token === undefined) {
      Router.push("/");
      //Revisar pagina de login
    }
    // Obtencion y decodificacion del token
    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    const response = await axios.get(
      `${process.env.API_URL}/findOneUser/${decoded.sub}`
    );
    if (response === 200) {
      setUserInfo({
        ...userInfo,
        id: response.data._id,
        nombre: response.data.name,
        rut: response.data.rut,
      });
    }
  };

  const getRegistros = async () => {
    const token = Cookies.get("token");
    if (!token || token === "" || token === undefined) {
      Router.push("/");
    }
    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    const registros = await axios.get(
      `${process.env.API_URL}/BuscarRegistrosTotal/search/${decoded.sub}`
    );
    if (registros.status === 200) {
      // Seteo de registros al estado de registros
      setRegistros(registros.data);
    }
  };

  const showRegistros = () => {
    return registros.map((registro) => {
      const fecha = new Date(registro.fechaRegistro);
      const fechaFormateada = fecha.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
      return (
        <Tr
          key={registro._id}
          _hover={{
            background: "rgb( 0 0 0 / 20% )",
          }}
        >
          <Td textAlign="center">{fechaFormateada}</Td>
          <Td textAlign="center">{registro.cantidadPago}</Td>
          <Td textAlign="center">{registro.pago}</Td>
        </Tr>
      );
    });
  };

    // useEffect para obtener informacion de usuario y registros.
    useEffect(() => {
      getUserInfo();
      getRegistros();
    }, []);

  return (
    <>
      <DynamicNavBar />
      <Container
        maxW={"fit-content"}
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
          Historial de registros
        </Heading>
        <TableContainer>
          <Table variant="unstyled" size={'lg'}>
            <Thead bg={"#b9d1d3"}>
              <Tr fontWeight={"bold"}>
                <Td textAlign="center">Fecha</Td>
                <Td textAlign="center">Monto</Td>
                <Td textAlign="center">Tipo de pago</Td>
              </Tr>
            </Thead>
            <Tbody bg={"#dae9ea"}>{showRegistros()}</Tbody>
          </Table>
        </TableContainer>
        <Center marginBlock={"1.5rem"}>
          <Button
            colorScheme={"messenger"}
            w="25rem"
            h={"5rem"}
            fontSize="2xl"
            onClick={() => Router.back()}
          >
            Volver
          </Button>
        </Center>
      </Container>
    </>
  );
};

export default registros;
