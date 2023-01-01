import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DynamicNavBar from "../../components/DynamicNavBar";
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
  Image,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";

export async function getServerSideProps(context) {
  // console.log("URL DE QUERY>>>>>" + context.params.usuario);
  // console.log(context)
  try {
    const response = await axios.get(
      // `${process.env.API_URL}/findOneUser/${context.query.usuario}`
      `${process.env.API_URL}/findOneUser/${context.params.usuario}`

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




const usuario = (data) => {
  const router = useRouter();
  const [user] = useState(data);
  console.log(user);

  const [updates, setUpdates] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(updates);
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.API_URL}/updateUser/${user.data._id}`,
        updates
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setIsLoading(false);
      // router.push(`/usuario/${user.data._id}`)
      router.reload();
    }, 2000);
  };

  const onChange = (e) => {
    setUpdates({
      ...updates,
      [e.target.name]: e.target.value,
    });
  };

  //SOLOADMIS
  const comprobacion = () => {
    const token = Cookie.get("token");
    if (!token) {
      router.push('/')
    }
  };

  useEffect(() => {
    // if (!user.data) {
    //   router.push(`/usuario/${usuario._id}`,`/usuario`)

    var uri = window.location.toString();
    var clean_uri = uri.substring(0, uri.lastIndexOf('/'));
    window.history.replaceState({}, document.title, clean_uri);
    // console.log(uri)

    comprobacion();

  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <DynamicNavBar />
      <Container
        bg={"#D6E4E5"}
        margin=" 3rem auto"
        p={"3rem"}
        borderRadius="0.9rem"
      >
        <Heading textTransform={"uppercase"} textAlign="center">
          Informacion basica
        </Heading>
        <Box p="1rem" align="center">
          <Image
            bgColor={"white"}
            borderRadius={"full"}
            boxSize="150px"
            src={`https://robohash.org/${user.data._id}`}
            alt="imagen de usuario"
          />
        </Box>
        <Text>
          <span style={{ fontWeight: "bold" }}>Nombre: </span>
          {user.data.name}
        </Text>
        <Text>
          <span style={{ fontWeight: "bold" }}>RUT: </span>
          {user.data.rut}
        </Text>
        <Text>
          <span style={{ fontWeight: "bold" }}>Correo: </span>
          {user.data.correo}
        </Text>
        <Text>
          <span style={{ fontWeight: "bold" }}>Nº Vivienda: </span>
          {user.data.numeroVivienda}
        </Text>
        <Text>
          <span style={{ fontWeight: "bold" }}>Convivientes: </span>
          {user.data.personasConvive}
        </Text>
        <Modal size="2xl" isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar información</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel fontWeight={"bold"}>Nombre</FormLabel>
                <Input
                  size={"lg"}
                  name={"name"}
                  onChange={onChange}
                  defaultValue={user.data.name}
                ></Input>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel fontWeight={"bold"}>Rut</FormLabel>
                <Input
                  size={"lg"}
                  name="rut"
                  onChange={onChange}
                  defaultValue={user.data.rut}
                ></Input>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel fontWeight={"bold"}>Correo</FormLabel>
                <Input
                  size={"lg"}
                  name="correo"
                  onChange={onChange}
                  defaultValue={user.data.correo}
                ></Input>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel fontWeight={"bold"}>Nº Vivienda</FormLabel>
                <Input
                  size={"lg"}
                  name="numeroVivienda"
                  onChange={onChange}
                  defaultValue={user.data.numeroVivienda}
                ></Input>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontWeight={"bold"}>Nº Personas</FormLabel>
                <Input
                  type={"Number"}
                  size={"lg"}
                  name="personasConvive"
                  onChange={onChange}
                  defaultValue={user.data.personasConvive}
                ></Input>

              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Button
                size={"lg"}
                colorScheme="teal"
                mr={3}
                type="submit"
                onClick={onSubmit}
                isLoading={isLoading}
              >
                Guardar
              </Button>
              <Button size={"lg"} onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Flex
          justifyContent={"center"}
          flexDirection={{ base: "column", md: "row" }}
          alignItems={"center"}
          gap="1rem"
          marginBlock={"1.5rem"}
        >
          <Button
            colorScheme="teal"
            height={{ base: "5rem", md: "5rem" }}
            width={{ base: "100%", md: "35%" }}
            fontSize="2xl"
            onClick={onOpen}
          >
            Editar
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

export default usuario;
