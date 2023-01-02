// Componente NavBar importado
import DynamicNavBar from "../components/DynamicNavBar";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import Swal from "sweetalert2";

// Componentes importados de Chakra UI
import {
  Button,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Heading,
  Flex,
  TableContainer,
  Avatar,
} from "@chakra-ui/react";

// Iconos importados
import { BsTrashFill } from "react-icons/bs";
import { VscAdd } from "react-icons/vsc";

const verRegistros = () => {
  const router = useRouter();

  // Inicializamos el estado de los registros.
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    comprobacion();
    getRegistros();
  }, []);


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

  // Obtencion de registros.
  const getRegistros = async () => {
    const response = await axios.get(
      `${process.env.API_URL}/BuscarRegistrosAll`
    );
    // Seteo de los registros obtenidos.
    setRegistros(response.data);
  };

  // Confirmar para eliminar registros.
  const deletdeudaConfirmation = (id) => {
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
        deleteDeudas(id);
        Swal.fire({
          title: "Eliminado!",
          text: "El registros ha sido eliminado",
          icon: "success",
        });
      }
    });
  };
  //Elimina la registros por su id.
  const deleteDeudas = async (id) => {
    const response = await axios.delete(
      `${process.env.API_URL}//EliminarRegistro/delete/` + id
    );
    getRegistros();
  };

  const showRegistros = () => {
    return registros.map((registros, index) => {
      // Verificamos el rol de usuario, si es administrador no se muestra en el listado.
      if (registros.regidVecino.role === "admin") {
        return
      }
      // Formateamos la fecha para mostrarla en el listado.
      const fecha = new Date(registros.fechaRegistro);
      const fechaFormateada = fecha.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      return (
        <Tr
          key={registros._id}
          _hover={{
            background: "rgb( 0 0 0 / 20% )",
          }}
        >
          <Td>
            <Flex alignItems={"center"} justifyContent="center" gap={3}>
              <Avatar
                borderRadius={"50%"}
                borderColor="black"
                borderWidth="1px"
                bg={"#D6E4E5"}
                src={`https://robohash.org/${registros.regidVecino._id}`}
              />
              <spawn>{registros.regidVecino.name}</spawn>
            </Flex>
          </Td>
          <Td textAlign="center">{registros.regidVecino.rut}</Td>
          <Td textAlign="center">{fechaFormateada}</Td>
          <Td textAlign="center">{registros.cantidadPago}</Td>
          <Td textAlign="center">{registros.pago}</Td>
          <Td
            textAlign="center"
            display={"flex"}
            justifyContent="center"
            gap={{ base: "1rem" }}
          >
            <Button
              bg={"#b9d1d3"}
              as={VscAdd}
              boxSize={{ base: "50", md: "35" }}
              onClick={() => router.push(`/registros/${registros._id}`)}
              cursor={"pointer"}
              _hover={{
                bg: "#4ea39a",
                color: "white",
              }}
            />
            <Button
              bg={"#b9d1d3"}
              as={BsTrashFill}
              boxSize={{ base: "50", md: "35" }}
              onClick={() => deletdeudaConfirmation(registros._id)}
              cursor={"pointer"}
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
  
  return (
    <>
      <DynamicNavBar />
      <Container
        maxW="container.xl"
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
          <Table variant={"unstyled"}>
            <Thead bg={"#b9d1d3"}>
              <Tr fontWeight={"bold"}>
                <Td textAlign="center">Nombre</Td>
                <Td textAlign="center">Rut</Td>
                <Td textAlign="center">Fecha del registro</Td>
                <Td textAlign="center">Cantidad de pago</Td>
                <Td textAlign="center">Tipo de pago</Td>
                <Td textAlign="center">Accion</Td>
              </Tr>
            </Thead>
            <Tbody bg={"#dae9ea"}>{showRegistros()}</Tbody>
          </Table>
        </TableContainer>
        <Flex
          justifyContent={"center"}
          flexDirection={{ base: "column", md: "row" }}
          alignItems={"center"}
          gap="1rem"
          marginBlock={"1.5rem"}
        >
          <Button
            colorScheme={"teal"}
            height={{ base: "5rem", md: "5rem" }}
            width={{ base: "100%", md: "35%" }}
            fontSize="2xl"
            onClick={() => router.push("/CrearRegistroPago")}
          >
            Crear Registro
          </Button>
          <Button
            colorScheme={"teal"}
            height={{ base: "5rem", md: "5rem" }}
            width={{ base: "100%", md: "35%" }}
            fontSize="2xl"

            onClick={() => router.push("/CrearRegistroAbono")}
          >
            Crear Abono
          </Button>
          <Button
            colorScheme={"messenger"}
            height={{ base: "5rem", md: "5rem" }}
            width={{ base: "100%", md: "35%" }}
            fontSize="2xl"
            onClick={() => router.back()}
          >
            Volver
          </Button>
        </Flex> 
      </Container>
    </>
  );
};
export default verRegistros;
