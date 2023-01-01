import DynamicNavBar from "../components/DynamicNavBar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
// Componentes importados
import {
  Button,
  Container,
  Stack,
  Heading,
  FormControl,
  Input,
  FormLabel,
  NumberInput,
  Select,
  Icon,
  InputGroup,
  InputLeftAddon,
  Center,
} from "@chakra-ui/react";
// Iconos importados
import {
  MdPerson,
  MdDateRange,
  MdPanTool,
  MdAttachMoney,
} from "react-icons/md";

/// Crear registro de pago
const CreateRegistro = () => {
  const router = useRouter();

  const [users, setUsers] = useState([]);

  // Obtencion de los usuarios de la base de datos.
  const getUsers = async () => {
    // Obtencion de los usuarios de la base de datos.
    const response = await axios.get(`${process.env.API_URL}/buscarUser`);
    // Seteo de los usuarios obtenidos.
    setUsers(response.data);
  };

  const [values, setValues] = useState({
    regidVecino: "",
    fechaRegistro: "",
    cantidadPago: "",
    pago: "",
  });

  // Comprobacion de token(Cookies)
  const comprobacion = () => {
    const token = Cookie.get("token");
    if (token) {
      const decoded = jwt.decode(token, process.env.SECRET_KEY);
      if (decoded.role === "admin") {
        // router.push("/CreateRegistroAbono");
      }
      if (decoded.role === "user") {
        router.push("/userManagement");
      }
    } else {
      router.push("/");
    }
  };

  //
  useEffect(() => {
    comprobacion();
    getUsers();
  }, []);

  // Creacion de registro de pago
  const onSubmit = async (e) => {
    <Icon as={MdPerson} />;
    try {
      const response = await axios.post(
        `${process.env.API_URL}/CrearRegistroPago`,
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




  const [selectedUser, setSelectedUser] = useState(null);

  // Mostrar los rut disponibles para crear registro de pago.
  const showRuts = () => {
    if (users.length === 0) {

      return <option>No hay usuarios</option>;
    }
    return (
      <Select
        bg={"#F7F7F7"}
        placeholder="Seleciona rut"
        onChange={(e) => {
          onChange(e)
          onChangeRut(e)
        }}
        name={"rutVecino"}
      >
        {users.map((user) => {
          if (user.role !== 'admin') {
            return <option value={user.rut} label={`${user.rut} (${user.name})`}></option>
          }
        })}
      </Select>
    );
  };


  // Obtencion de los datos del formulario.
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

  };
  const onChangeRut = (e) => {
    const rut = e.target.value;
    const selected = users.find((user) => user.rut === rut);

    setSelectedUser(selected)
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
        <Heading
          textAlign={"center"}
          textTransform="uppercase"
          marginBottom={"4"}
        >
          Registro de pago
        </Heading>
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
                type="text"
                value={selectedUser ? selectedUser.name : ""}
                readOnly
                placeholder="Nombre del usuario"
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={"1.2rem"}>Rut</FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon
                bg={"#a8d3d1"}
                children={<Icon as={MdPerson} />}
              />
              {showRuts()}
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
            <FormLabel fontSize={"1.2rem"}>Monto de pago</FormLabel>
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

          <FormControl>
            <FormLabel fontSize={"1.2rem"}>Tipo de pago</FormLabel>
            <InputGroup>
              <InputLeftAddon
                bg={"#a8d3d1"}
                children={<Icon as={MdPanTool} />}
              />
              <Select
                bg={"#F7F7F7"}
                placeholder="Seleciona el tipo de pago"
                onChange={onChange}
                name={"pago"}
              >
                <option>pago con atraso</option>
                <option>pago a tiempo</option>
              </Select>
            </InputGroup>
          </FormControl>
        </Stack>
        <Center my={{ base: "3rem", md: "3rem" }}>
          <Button
            colorScheme={"teal"}
            type="submit"
            height={{ base: "8rem", md: "5rem" }}
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

export default CreateRegistro;
