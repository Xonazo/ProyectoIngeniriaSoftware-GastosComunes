import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Heading,
  Stack,
  Center,
  TableContainer,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import DynamicNavBar from "../components/DynamicNavBar";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
// Iconos importados
import { BsTrashFill } from "react-icons/bs";
import { RiAddCircleFill, RiDeleteBack2Fill } from "react-icons/ri";


const ViewDeudas = () => {
  const router = useRouter();

  const [deudas, setdeudas] = useState([]);
  useEffect(() => {
    getDeudas();
  }, []);

  //COLOCAR EN PAGINAS DE ADMINS
  const comprobacion = () => {
    const token = Cookie.get("token");
    if (token) {
      const decoded = jwt.decode(token, process.env.SECRET_KEY);
      if (decoded.role === "admin") {
        router.push("/verDeudas");
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

  const getDeudas = async () => {
    const response = await axios.get(`${process.env.API_URL}/buscarDeudas`);
    console.log(response);
    if (response.status === 200) {
      setdeudas(response.data);
    }
  };

  // Confirmar para eliminar Deuda.
  const deletedeudaConfirmation = (id) => {
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
          text: "El Deuda ha sido eliminada",
          icon: "success",
        });
      }
    });
  };
  //Elimina la Deuda por su id.
  const deleteDeudas = async (id) => {
    const response = await axios.put(
      `${process.env.API_URL}/eliminarDeuda/` + id
    );
    getDeudas();
  };

  const actualizardeudaConfirmation = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Luego no podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, actualizar!",
    }).then((result) => {
      if (result.isConfirmed) {
        actualizarDeuda(id);
        Swal.fire({
          title: "Eliminado!",
          text: "El Deuda ha sido actualizada",
          icon: "success",
        });
      }
    });
  };
  //Actualizar la Deuda por su id.
  const actualizarDeuda = async (id) => {
    const response = await axios.put(`${process.env.API_URL}/updateOne/` + id);
    getDeudas();
  };

  const actualizarTODASdeudaConfirmation = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Luego no podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, actualizar!",
    }).then((result) => {
      if (result.isConfirmed) {
        actualizarTODASDeuda();
        Swal.fire({
          title: "Eliminado!",
          text: "TODAS las deudas han sido actualizadas",
          icon: "success",
        });
      }
    });
  };
  //Actualizar la Deuda por su id.
  const actualizarTODASDeuda = async () => {
    const response = await axios.put(
      `${process.env.API_URL}/actualizarTODASDeudas`
    );
    getDeudas();
  };

  const showdeudas = () => {
    return deudas.map((usuario, index) => {
      if (usuario.idvecino.role === "admin") {
        return
      }
      return (
        <Tr
          key={usuario._id}
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
                src={`https://robohash.org/${usuario.idvecino._id}`}
              />
              <span>{usuario.idvecino.name}</span>
            </Flex>
          </Td>
          <Td>{usuario.idvecino.rut}</Td>
          <Td>{usuario.deuda}</Td>
          <Td>{usuario.abono}</Td>
          <Td display={"flex"} justifyContent="space-around" gap={"1rem"}>
            <Button
              title="Asignar deuda"
              as={RiAddCircleFill}
              boxSize={"35"}
              onClick={() => actualizardeudaConfirmation(usuario._id)}
              cursor={"pointer"}
              _hover={{
                bg: "green.400",
                color: "white",
              }}
            />
            <Button
              as={RiDeleteBack2Fill}
              boxSize={"35"}
              onClick={() => deletedeudaConfirmation(usuario._id)}
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
          LISTA DE DEUDAS
        </Heading>
        <TableContainer>
          <Table variant="unstyled">
            <Thead bg={"#b9d1d3"}>
              <Tr fontWeight={"bold"}>
                <Td textAlign={"center"}>Nombre</Td>
                <Td textAlign={"center"}>Rut</Td>
                <Td textAlign={"center"}>Deuda</Td>
                <Td textAlign={"center"}>Abono</Td>
                <Td textAlign={"center"}>Accion</Td>
              </Tr>
            </Thead>
            <Tbody bg={"#dae9ea"}>{showdeudas()}</Tbody>
          </Table>
        </TableContainer>
        <Center marginBlock={"1.5rem"}>
          <Button
            colorScheme="teal"
            w="25rem"
            h={"5rem"}
            fontSize="2xl"
            onClick={() => actualizarTODASdeudaConfirmation()}
          >
            Asignar deuda a todos
          </Button>
        </Center>
      </Container>
    </>
  );
};
export default ViewDeudas;
