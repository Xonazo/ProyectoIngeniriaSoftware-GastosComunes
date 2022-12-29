import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Input,
  Stack,
  Text,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Heading,
  CloseButton,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { BsTrashFill } from "react-icons/bs";
import DynamicNavBar from "../components/DynamicNavBar";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";

import { VscAdd } from "react-icons/vsc";

const verRegistros = () => {
  const router = useRouter();

  const [products, setRegistros] = useState([]);
  useEffect(() => {
    getRegistros();
  }, []);

  const comprobacion = () => {
    const token = Cookie.get("token")
    if (token) {
      const decoded = jwt.decode(token, process.env.SECRET_KEY)
      if (decoded.role === "admin") {
        //router.push("/management");
      }
      if (decoded.role === "user") {
        router.push("/userManagement");
      }
    } else {
      router.push("/");
    }
  }
  useEffect(() => {
    comprobacion()
  }, [])


  const getRegistros = async () => {
    const response = await axios.get(`${process.env.API_URL}/BuscarRegistrosAll`);
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
    return products.map((registros, index) => {
        const fecha = new Date(registros.fechaRegistro)
        const fechaFormateada = fecha.toLocaleDateString("es-ES", {
          day: "numeric",
          month: "numeric",
          year: "numeric"
        })
        
      return (
        <Tr
          key={registros._id}
          _hover={{
            background: "rgb( 0 0 0 / 20% )",
          }}
        >
          <Td textAlign="center">{registros.regidVecino.name}</Td>
          <Td textAlign="center">{registros.regidVecino.rut}</Td>
          <Td textAlign="center">{fechaFormateada}</Td>
          <Td textAlign="center">{registros.cantidadPago}</Td>
          <Td textAlign="center">{registros.pago}</Td>
          <Td textAlign="center" display={"flex"} justifyContent="space-around">
            <Button
              as={BsTrashFill}
              boxSize={"35"}
              onClick={() => deletdeudaConfirmation(registros._id)}
              cursor={"pointer"}
              _hover={{
                bg: "#8E1113",
                color: "white",
              }}
            />
            <Button
              as={VscAdd}
              boxSize={`35`}
              onClick={() => router.push(`/registros/${registros._id}`)}
              cursor={"pointer"}
              _hover={{
                bg: "teal",
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

      <Container maxW="container.xl" centerContent>
        <Heading textAlign="center" my={10}>
          HISTORIAL DE REGISTROS
        </Heading>
        <Stack>
          <Button
            colorScheme={"teal"}
            size="lg"
            onClick={() => router.push("/CrearRegistroPago")}
          >
            Crear registros
          </Button>
          <Button
            colorScheme={"teal"}
            size="lg"
            onClick={() => router.push("/CrearRegistroAbono")}
          >
            Crear Abono
          </Button>
        </Stack>
        <Table variant={"simple"} my="10">
          <Thead color="white">
            <Tr
              borderColor={"black"}
              bg={"black"}
              borderWidth="2px"
              textTransform={"uppercase"}
            >
              <Td textAlign="center">Nomnbre</Td>
              <Td textAlign="center">Rut</Td>
              <Td textAlign="center">Fecha del registro</Td>
              <Td textAlign="center">Cantidad de pago</Td>
              <Td textAlign="center">Tipo de pago</Td>
              <Td textAlign="center">Accion</Td>
            </Tr>
          </Thead>
          <Tbody borderColor={"black"} borderWidth="2px">
            {showRegistros()}
          </Tbody>
        </Table>
      </Container>
    </>
  );
};
export default verRegistros;