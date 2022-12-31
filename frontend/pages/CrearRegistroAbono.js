import { useState, useEffect } from "react";
import axios from "axios";
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
  Center,
} from "@chakra-ui/react";
import {
  MdPerson,
  MdDateRange,
  MdPanTool,
  MdAttachMoney,
} from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import DynamicNavBar from "../components/DynamicNavBar";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";

const CreateRegistroAbono = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    regidVecino: "",
    fechaRegistro: "",
    cantidadPago: "",
    pago: "pago abono",
  });

  //COLOCAR EN PAGINAS DE ADMINS
  const comprobacion = () => {
    const token = Cookie.get("token");
    if (token) {
      const decoded = jwt.decode(token, process.env.SECRET_KEY);
      if (decoded.role === "admin") {
        //router.push("/CreateRegistroAbono");
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

  const onSubmit = async (e) => {
    <Icon as={MdPerson} />;
    try {
      const response = await axios.post(
        `${process.env.API_URL}/CrearRegistroAbono`,
        values
      );
      console.log(response);
      if (response.status === 201) {
        Swal.fire({
          title: "Registro creado",
          text: "El registro se ha creado correctamente",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          router.push("/verRegistro");
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
          Registro de Abono
        </Heading>
        <Stack>
          <FormControl>
            <FormLabel fontSize={"1.2rem"}>Rut vecino</FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon
                bg={"#a8d3d1"}
                children={<Icon as={MdPerson} />}
              />
              <Input
                bg={"#F7F7F7"}
                placeholder="Rut del vecino"
                type={"String"}
                onChange={onChange}
                name={"rutVecino"}
              ></Input>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={"1.2rem"}>Fecha del registro</FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon
                bg={"#a8d3d1"}
                children={<Icon as={MdDateRange} />}
              />
              <NumberInput width="100%">
                <Input
                  bg={"#F7F7F7"}
                  placeholder="Fecha"
                  type={"date"}
                  onChange={onChange}
                  name={"fechaRegistro"}
                />
              </NumberInput>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={"1.2rem"}>Cantidad del pago</FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon
                bg={"#a8d3d1"}
                children={<Icon as={MdAttachMoney} />}
              />
              <Input
                bg={"#F7F7F7"}
                placeholder="Cantidad del pago"
                type={"Number"}
                onChange={onChange}
                name={"cantidadPago"}
              ></Input>
            </InputGroup>
          </FormControl>
        </Stack>
        <Center>
          <Button
            colorScheme={"teal"}
            type="submit"
            my={"5"}
            height={{ base: "5rem", md: "5rem" }}
            width={{ base: "100%", md: "35%" }}
            fontSize="2xl"
            onClick={onSubmit}
          >
            Crear registro
          </Button>
        </Center>
      </Container>
    </>
  );
};

export default CreateRegistroAbono;
