// Componente NavBar importado
import DynamicNavBar from "../components/DynamicNavBar";
// Componente para mostrar archivo por cada usuario
import ShowImage from "../components/ShowImage";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";

// Componentes importados de Chakra UI
import {
  Container,
  Heading,
  Table,
  TableContainer,
  Thead,
  Tr,
  Td,
  Tbody,
  Avatar,
  Flex,
  Button,
  Center,
} from "@chakra-ui/react";

import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillDollarCircle } from "react-icons/ai";

const viewImage = () => {

  const router = useRouter();
  // Inicializamos el estado de los archivos(files)
  const [files, setFiles] = useState([]);

  //Obtenemos y decodificamos el token
  const token = Cookie.get("token");
  const decoded = jwt.decode(token, process.env.SECRET_KEY);

  // Obtencion de archivos
  const getFiles = async () => {
    const response = await axios.get(`${process.env.API_URL}/files`);
    console.log(response.data);
    setFiles(response.data);
  };

  // Comprobacion de token(Cookies)
  const comprobacion = () => {
    const token = Cookie.get("token");
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

  // useEffect para volver a comprobar cookies y obtener archivos(files)
  useEffect(() => {
    comprobacion();
    getFiles();
  }, []);

  // Obtenemos la fecha que se encuentra en la url del archivo.
  function extractNumberSubstring(url) {
    const match = url.match(/\d+/);
    if (!match) {
      return "";
    }
    const start = url.indexOf(match[0]);
    const end = url.indexOf(
      "-",
      url.indexOf("-", url.indexOf("-", start + 1) + 1) + 1
    );
    if (end === -1) {
      return "";
    }
    return url.substring(start, end);
  }

  // Funcion para mostrar los archivos
  const showFiles = () => {
    // Se recorre el arreglo de archivos obtenidos
    return files.map((file) => {
      const dateFile = extractNumberSubstring(file.url);
      // Retornan los datos de los archivos
      return (
        <>
          <Tr
            key={file._id}
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
                  src={`https://robohash.org/${file.user}`}
                />
                <span>{file.nombre}</span>
              </Flex>
            </Td>

            <Td textAlign={"center"}>{dateFile}</Td>

            <Td display={"flex"} justifyContent="center">
              <ShowImage fileId={file._id} />
            </Td>
            <Td>
              <Center>
                <Button
                  title="Pagar"
                  as={AiFillDollarCircle}
                  boxSize={{ base: "50", md: "35" }}
                  _hover={{
                    bg: "#4ea39a",
                    color: "white",
                  }}
                  onClick={() => router.push("/CrearRegistroPago")}>
                </Button>
              </Center>
            </Td>
            <Td>
              <Center>
                <Button
                  title="Abonar"
                  as={AiFillPlusCircle}
                  boxSize={{ base: "50", md: "35" }}
                  _hover={{
                    bg: "#4ea39a",
                    color: "white",
                  }}
                  onClick={() => router.push("/CrearRegistroAbono")}>
                </Button>
              </Center>
            </Td>
          </Tr>
        </>
      );
    });
  };

  return (
    <>
      <DynamicNavBar />
      <Container
        bg={"#D6E4E5"}
        margin=" 3rem auto"
        p={"3rem"}
        borderRadius={"1rem"}
        maxW={"container.md"}
      >
        <Heading
          textTransform={"uppercase"}
          textAlign="center"
          marginBottom={"1rem"}
        >
          Lista de comprobantes
        </Heading>
        <TableContainer>
          <Table>
            <Thead bg={"#b9d1d3"}>
              <Tr fontWeight={"bold"}>
                <Td textAlign={"center"}>Nombre</Td>
                <Td textAlign={"center"}>Fecha</Td>
                <Td textAlign={"center"}>Ver</Td>
                <Td textAlign={"center"}>Pago</Td>
                <Td textAlign={"center"}>Abono</Td>
              </Tr>
            </Thead>
            <Tbody>{showFiles()}</Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default viewImage;
