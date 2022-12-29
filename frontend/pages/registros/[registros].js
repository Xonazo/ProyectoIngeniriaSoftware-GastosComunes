import { useState, useRef } from "react";
import Router, { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import axios from "axios";
import {
  Button,
  Container,
  Heading,
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

export async function getServerSideProps(context) {
  console.log("URL DE QUERY>>>>>" + context.params.registros);
  try {
    const response = await axios.get(
      `${process.env.API_URL}/BuscarRegistro/search/${context.params.registros}`
    );
    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
}

const registros = (data) => {
  const router = useRouter();
  const [registros] = useState(data);
  console.log(registros);

  const [updates, setUpdates] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(updates);
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.API_URL}/ActualizarRegistro/update/${registros.data._id}`,
        updates
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setIsLoading(false);
      Router.reload();
    }, 2000)
  };

  const onChange = (e) => {
    setUpdates({
      ...updates,
      [e.target.name]: e.target.value,
    });
  };


  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
      <NavBar />
      <Container
        bg={"#D6E4E5"}
        margin=" 3rem auto"
        p={"3rem"}
        borderRadius="0.9rem"
      >
        <Heading textTransform={"uppercase"} textAlign="center" padding={"4"} >
          Informacion registro
        </Heading>
        <Text>
          <span style={{ fontWeight: "bold" }}>Rut del vecino: </span>
          {registros.data.rutVecino}
        </Text>

        <Text>
          <span style={{ fontWeight: "bold" }}>Fecha del Registro: </span>
          {registros.data.fechaRegistro}
        </Text>
        <Text>
          <span style={{ fontWeight: "bold" }}>Cantidad del pago: </span>
          {registros.data.cantidadPago}
        </Text>
        <Text>
          <span style={{ fontWeight: "bold" }}>Tipo de pago: </span>
          {registros.data.pago}
        </Text>
        <Box align="center" marginTop={"5"}>
          <Button onClick={onOpen} colorScheme="teal" size={"lg"}>
            Editar
          </Button>
          <Button onClick={() => router.push(`/VerRegistros/`)} colorScheme="teal" size={"lg"} marginLeft="20">
            Ver registros
          </Button>
        </Box>
        <Modal
          size="2xl"
          isCentered
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar información</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel fontWeight={'bold'}>Fecha del Registros:</FormLabel>
                <Input size={'lg'} name="fechaRegistro" onChange={onChange} type={"date"} defaultValue={registros.data.fechaRegistro}></Input>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel fontWeight={'bold'}>Cantidad del pago:</FormLabel>
                <Input size={'lg'} name="cantidadPago" onChange={onChange} type={"number"} defaultValue={registros.data.cantidadPago}></Input>
              </FormControl>

            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Button size={'lg'} colorScheme="teal" mr={3} type='submit' onClick={onSubmit} isLoading={isLoading}>
                Guardar
              </Button>
              <Button size={'lg'} onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>

    </>
  );
};

export default registros;