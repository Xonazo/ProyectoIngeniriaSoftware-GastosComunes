//Importamos NavBar dinamico.
import DynamicNavBar from "../components/DynamicNavBar";
//Importamos SweetAlert.
import Swal from "sweetalert2";
//Importamos axios.
import axios from "axios";
// Importamos React Hooks.
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Importamos los componentes utilizados de Chakra UI.
import {
  Button,
  Container,
  Stack,
  Heading,
  FormControl,
  Input,
  FormLabel,
  NumberInput,
  NumberInputField,
  Select,
  Icon,
  InputGroup,
  Box,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
// Importamos los iconos utilizados de React Icons.
import {
  MdPerson,
  MdEmail,
  MdFamilyRestroom,
  MdHouse,
  MdFingerprint,
  MdPanTool,
} from "react-icons/md";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
export default function CreateUser() {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    rut: "",
    correo: "",
    numeroVivienda: "",
    personasConvive: "",
    role: "",
  });

  const onSubmit = async (e) => {
    <Icon as={MdPerson} />;
    try {
      const response = await axios.post(
        `${process.env.API_URL}/crearUser`,
        values
      );
      console.log(response);
      if (response.status === 201) {
        Swal.fire({
          title: "Usuario creado",
          text: "El usuario se ha creado correctamente",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          router.push("/management");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  //SOLOADMIS
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
  useEffect(() => {
    comprobacion();
  }, []);

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
  // Esta función se ejecutaría cada vez que el usuario ingrese un caracter en el input
  function onRutInput(event) {
    var rut = event.target.value;
    event.target.value = formatRut(rut);

  }
  function restrictInput(event) {
    var input = event.target;
    input.value = input.value.replace(/[^0-9kK]/g, '');
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
        <Heading textAlign={"center"} textTransform="uppercase">
          Crear usuario
        </Heading>
        <Container>
          <Text p="2">Completa los siguientes campos</Text>
          <Stack>
            <FormControl>
              <FormLabel fontSize={"1.2rem"}>Nombre</FormLabel>
              <InputGroup size="lg">
                <InputLeftAddon
                  bg={"#a8d3d1"}
                  children={<Icon as={MdPerson} />}
                />
                <Input
                  bg={"#F7F7F7"}
                  placeholder="Nombre y apellido"
                  type={"text"}
                  onChange={onChange}
                  name={"name"}
                ></Input>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel fontSize={"1.2rem"}>Rut</FormLabel>
              <InputGroup size="lg">
                <InputLeftAddon
                  bg={"#a8d3d1"}
                  children={<Icon as={MdFingerprint} />}
                />
                <Input
                  width="100%"
                  bg={"#F7F7F7"}
                  placeholder="xx.xxx.xxx-k"
                  type={"text"}
                  maxLength="12"
                  onChange={(e) => {
                    restrictInput(e);
                    onRutInput(e);
                    onChange(e);
                    
                  }}
                  name={"rut"}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel fontSize={"1.2rem"}>Correo electronico</FormLabel>
              <InputGroup size="lg">
                <InputLeftAddon
                  bg={"#a8d3d1"}
                  children={<Icon as={MdEmail} />}
                />
                <Input
                  bg={"#F7F7F7"}
                  placeholder="nombre@ejemplo.com"
                  type={"email"}
                  onChange={onChange}
                  name={"correo"}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel fontSize={"1.2rem"}>Numero vivienda</FormLabel>
              <InputGroup size="lg">
                <InputLeftAddon
                  bg={"#a8d3d1"}
                  children={<Icon as={MdHouse} />}
                />
                <NumberInput width={"100%"}>
                  <NumberInputField
                    bg={"#F7F7F7"}
                    placeholder="#0000"
                    type={"number"}
                    onChange={onChange}
                    name={"numeroVivienda"}
                  ></NumberInputField>
                </NumberInput>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel fontSize={"1.2rem"}>Cant. de convivientes</FormLabel>
              <InputGroup size="lg">
                <InputLeftAddon
                  bg={"#a8d3d1"}
                  children={<Icon as={MdFamilyRestroom} />}
                />
                <Input
                  bg={"#F7F7F7"}
                  placeholder="Cantidad de personas"
                  type={"number"}
                  onChange={onChange}
                  name={"personasConvive"}
                ></Input>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"1.2rem"}>Tipo de usuario</FormLabel>
              <InputGroup>
                <InputLeftAddon
                  bg={"#a8d3d1"}
                  children={<Icon as={MdPanTool} />}
                />
                <Select
                  bg={"#F7F7F7"}
                  placeholder="Seleciona el tipo de usuario"
                  onChange={onChange}
                  name={"role"}
                >
                  <option>user</option>
                  <option>admin</option>
                </Select>
              </InputGroup>
            </FormControl>
          </Stack>
          <Box my={"10"} display='flex' flexDir={{ base: "column", md: "row" }} justifyContent='center' gap={'10'}>
            <Button
              colorScheme={"teal"}
              type="submit"
              onClick={onSubmit}
              height={{ base: "5rem", md: "5rem" }}
              width={{ base: "100%", md: "35%" }}
              fontSize="2xl"
            >
              Crear usuario
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
          </Box>
        </Container>
      </Container>
    </>
  );
}
