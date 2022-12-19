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
import { VscAdd } from "react-icons/vsc";
import Cookies from "js-cookie";

const viewUser = () => {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${process.env.API_URL}/buscarUser`);
    setProducts(response.data);
  };

  // Confirmar para eliminar usuario.
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
  //Elimina el usuario por su id.
  const deletUser = async (id) => {
    const response = await axios.delete(
      `${process.env.API_URL}/deleteUser/` + id
    );
    getUsers();
  };

  const showProducts = () => {
    return products.map((usuario, index) => {
      return (
        <Tr
          key={usuario._id}
          _hover={{
            background: "rgb( 0 0 0 / 20% )",
          }}
        >
          <Td textAlign="center">{usuario.numeroVivienda}</Td>
          <Td textAlign="center">{usuario.name}</Td>
          <Td textAlign="center">{usuario.rut}</Td>
          <Td textAlign="center">{usuario.correo}</Td>
          <Td textAlign="center">{usuario.personasConvive}</Td>
          <Td textAlign="center">{usuario.role}</Td>
          <Td textAlign="center" display={"flex"} justifyContent="space-around">
            <Button
              as={BsTrashFill}
              boxSize={"35"}
              onClick={() => deletUserConfirmation(usuario._id)}
              cursor={"pointer"}
              _hover={{
                bg: "#8E1113",
                color: "white",
              }}
            />
            <Button
              as={VscAdd}
              boxSize={`35`}
              onClick={() => router.push(`/usuario/${usuario._id}`)}
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

  const cerrar = async () => {
    await axios.get(`${process.env.API_URL}/logout`);
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <>
      <Container maxW="container.xl" centerContent>
        <Heading textAlign="center" my={10}>
          LISTA DE USUARIOS
        </Heading>
        <Button
          colorScheme={"teal"}
          size="lg"
          onClick={() => router.push("/CreateUser")}
        >
          Crear Usuario
        </Button>
        <Button 
        colorScheme={"teal"}
        size="lg" 
        onClick={() => cerrar()}
        >
          Logout
        </Button>
        <Table variant={"simple"} my="10">
          <Thead color="white">
            <Tr
              borderColor={"black"}
              bg={"black"}
              borderWidth="2px"
              textTransform={"uppercase"}
            >
              <Td textAlign="center">Numero Vivienda</Td>
              <Td textAlign="center">Nombre</Td>
              <Td textAlign="center">Rut</Td>
              <Td textAlign="center">Correo</Td>
              <Td textAlign="center">Convivientes</Td>
              <Td textAlign="center">Rol</Td>
              <Td textAlign="center">Accion</Td>
            </Tr>
          </Thead>
          <Tbody borderColor={"black"} borderWidth="2px">
            {showProducts()}
          </Tbody>
        </Table>
      </Container>
    </>
  );
};
export default viewUser;
