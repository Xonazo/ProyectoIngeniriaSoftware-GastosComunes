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

} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { BsTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import DynamicNavBar from "../components/DynamicNavBar";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";

const ViewDeudas = () => {
  const router = useRouter();

  const [deudas, setdeudas] = useState([]);
  useEffect(() => {
    getDeudas();
  }, []);


  //COLOCAR EN PAGINAS DE ADMINS
  const comprobacion = () => {
    const token = Cookie.get("token")
    if (token) {
      const decoded = jwt.decode(token, process.env.SECRET_KEY)
      if (decoded.role === "admin") {
        router.push("/verDeudas");
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

  
  const getDeudas = async () => {
    const response = await axios.get(`${process.env.API_URL}/buscarDeudas`);
    console.log(response)
    if (response.status === 200) {
      setdeudas(response.data)
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
    const response = await axios.put(
      `${process.env.API_URL}/updateOne/` + id
    );
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
      return (
        <Tr
          key={usuario._id}
          _hover={{
            background: "rgb( 0 0 0 / 20% )",
          }}
        >
          <Td textAlign="center">{usuario.idvecino.name}</Td>
          <Td textAlign="center">{usuario.idvecino.rut}</Td>
          <Td textAlign="center">{usuario.deuda}</Td>
          <Td textAlign="center">{usuario.abono}</Td>
          <Td textAlign="center" display={"flex"} justifyContent="space-around">
            <Button
              as={BsTrashFill}
              boxSize={"35"}
              onClick={() => deletedeudaConfirmation(usuario._id)}
              cursor={"pointer"}
              _hover={{
                bg: "#8E1113",
                color: "white",
              }}
            />
            <Button
              as={BsPencilSquare}
              boxSize={"35"}
              onClick={() => actualizardeudaConfirmation(usuario._id)}
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

      <Container maxW="container.xl" centerContent>
        <Heading textAlign="center" my={10}>
          LISTA DE DEUDAS
        </Heading>
        <Stack>
          <Button onClick={() => actualizarTODASdeudaConfirmation()}
            colorScheme="teal"
            size={"lg"}>
            Actualizar todas las deudas
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
              <Td textAlign="center">Nombre</Td>
              <Td textAlign="center">Rut</Td>
              <Td textAlign="center">Deuda</Td>
              <Td textAlign="center">Abono</Td>
              <Td textAlign="center">Accion</Td>
            </Tr>
          </Thead>
          <Tbody borderColor={"black"} borderWidth="2px">
            {showdeudas()}
          </Tbody>
        </Table>
      </Container>
    </>
  );
};
export default ViewDeudas;