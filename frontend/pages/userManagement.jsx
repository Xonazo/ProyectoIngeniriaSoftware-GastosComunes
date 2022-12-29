import DynamicNavBar from "../components/DynamicNavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Componentes CHAKRA UI
import {
  Center,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";

// Iconos importados
import { AiFillDollarCircle } from "react-icons/ai";
import { TbChecklist } from "react-icons/tb";
import { FaRegIdCard } from "react-icons/fa";

import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";

const Management = () => {
  const router = useRouter();
  const token = Cookie.get("token");
  const decoded = jwt.decode(token, process.env.SECRET_KEY);
  const id = decoded.sub;

  const [user, setUser] = useState([]);

  const getUser = async () => {
    const response = await axios.get(
      `${process.env.API_URL}/findOneUser/${id}`
    );
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
  }, []);

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
          size="xl"
          textTransform={"uppercase"}
          textAlign="center"
          marginBottom={"0.5rem"}
        >
          Bienvenido
        </Heading>
        <Heading
          size="2xl"
          textTransform={"uppercase"}
          textAlign="center"
          marginBottom={"2rem"}
        >
          {user.name}
        </Heading>
        <Center>
          <Image
            bgColor={"white"}
            borderRadius={"full"}
            boxSize="150px"
            src={`https://robohash.org/${user._id}`}
            alt="imagen de usuario"
            marginBottom={"2rem"}
          />
        </Center>
        <Center>
          <Heading size="lg">¿Qué buscas hoy?</Heading>
        </Center>

        <SimpleGrid columns={[2, null, 3]} spacing="40px" p={"2rem"}>
          <Button
            display={"flex"}
            flexDirection="column"
            height={"max-content"}
            maxWidth="max-content"
            p={"2rem"}
            _hover={{
              bg: "teal",
              color: "white",
            }}
          >
            <Icon as={AiFillDollarCircle} boxSize={90} />
            <Text textTransform={"uppercase"} fontSize={"xl"}>
              Pagar
            </Text>
          </Button>
          <Button
            display={"flex"}
            flexDirection="column"
            height={"max-content"}
            maxWidth="max-content"
            p={"2rem"}
            _hover={{
              bg: "teal",
              color: "white",
            }}
          >
            <Icon as={TbChecklist} boxSize={90} />
            <Text textTransform={"uppercase"} fontSize={"xl"}>
              Historial
            </Text>
          </Button>
          <Button
            display={"flex"}
            flexDirection="column"
            height={"max-content"}
            maxWidth="max-content"
            p={"2rem"}
            onClick={() => router.push(`/usuario/${user._id}`)}
            _hover={{
              bg: "teal",
              color: "white",
            }}
          >
            <Icon as={FaRegIdCard} boxSize={90} />
            <Text textTransform={"uppercase"} fontSize={"xl"}>
              Ver perfil
            </Text>
          </Button>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Management;
