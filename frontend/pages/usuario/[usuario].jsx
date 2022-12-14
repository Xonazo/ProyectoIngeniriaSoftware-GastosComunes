import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DynamicNavBar from "../../components/DynamicNavBar";
import axios from "axios";
import Swal from "sweetalert2";

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
  // console.log(user);

  const [updates, setUpdates] = useState({
    name: "",
    rut: "",
    correo: "",
    numeroVivienda: "",
    personasConvive: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(updates)

    if (updates.name === ""||updates.rut === ""||updates.correo === ""||updates.numeroVivienda === ""||updates.personasConvive === "") {
      onClose()
      Swal.fire({
        title: "Error",
        text: "El campo es invalido",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {

      const response = await axios.put(
        `${process.env.API_URL}/updateUser/${user.data._id}`,
        updates
      );

      // console.log(response);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setIsLoading(false);
      //router.push(`/usuario/${user.data._id}`)
      router.reload();

    }, 10);
  };


  function restrictInputMail(e) {

  }

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

    comprobacion();
  }, [])

  function formatRut(rut) {
    rut = rut.replace(/\./g, '').replace('-', '');

    if (rut.length == 8) {
      var formattedRut = rut.substring(0, 1) + ".";
      formattedRut += rut.substring(1, 4) + ".";
      formattedRut += rut.substring(4, 7) + "-";
      formattedRut += rut.substring(7)
      return formattedRut;
    }
    if (rut.length < 8) {
      return rut;
    }

    var formattedRut = rut.substring(0, 2) + ".";

    formattedRut += rut.substring(2, 5) + ".";
    formattedRut += rut.substring(5, 8) + "-";
    formattedRut += rut.substring(8)

    return formattedRut;
  }
  // Esta funci??n se ejecutar??a cada vez que el usuario ingrese un caracter en el input
  function onRutInput(event) {
    var rut = event.target.value;
    event.target.value = formatRut(rut);
  }

  function restrictInput(event) {
    var input = event.target;
    input.value = input.value.replace(/[^0-9kK]/g, '');
  }


  function restrictInputNombre(event) {
    var input = event.target;
    input.value = input.value.replace(/[^a-zA-Z???? ]/g, '');
  }




  const { isOpen, onOpen, onClose } = useDisclosure();

  const getValues = ()=> {
    setUpdates ({
      ...updates,
      name: user.data.name,
      rut: user.data.rut ,
      correo: user.data.correo ,
      numeroVivienda: user.data.numeroVivienda ,
      personasConvive: user.data.personasConvive
    })
  }


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
          <span style={{ fontWeight: "bold" }}>N?? Vivienda: </span>
          {user.data.numeroVivienda}
        </Text>
        <Text>
          <span style={{ fontWeight: "bold" }}>Convivientes: </span>
          {user.data.personasConvive}
        </Text>
        {user.data.role === 'admin' && (
          <Text>
            <span style={{ fontWeight: "bold" }}>Rol: </span>
            {user.data.role}
          </Text>
        )}



        <Modal size="2xl" isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar informaci??n</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel fontWeight={"bold"}>Nombre</FormLabel>
                <Input
                isRequired
                  size={"lg"}
                  name={"name"}
                  maxLength="40"
                  onChange={(e) => {
                    restrictInputNombre(e)
                    onChange(e);
                  }}
                  defaultValue={user.data.name}
                ></Input>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel fontWeight={"bold"}>Rut</FormLabel>
                <Input
                isRequired

                  size={"lg"}
                  name="rut"
                  maxLength="12"
                  onChange={(e) => {
                    restrictInput(e)
                    onRutInput(e);
                    onChange(e);

                  }}
                  defaultValue={user.data.rut}
                ></Input>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel fontWeight={"bold"}>Correo</FormLabel>
                <Input
                isRequired
                  size={"lg"}
                  name="correo"
                  onChange={(e) => {
                    restrictInputMail(e)
                    onChange(e);
                  }}
                  defaultValue={user.data.correo}
                ></Input>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel fontWeight={"bold"}>N?? Vivienda</FormLabel>
                <Input
                isRequired
                  size={"lg"}
                  name="numeroVivienda"
                  maxLength="4"
                  onChange={(e) => {
                    restrictInput(e)
                    onChange(e);
                  }}
                  defaultValue={user.data.numeroVivienda}
                ></Input>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontWeight={"bold"}>N?? Personas</FormLabel>
                <Input
                isRequired
                  size={"lg"}
                  name="personasConvive"
                  maxLength="2"
                  onChange={(e) => {
                    restrictInput(e)
                    onChange(e);

                  }}
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

            onClick={() => {
              onOpen()
              getValues()
            }}
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
