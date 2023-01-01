import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Image,
  SimpleGrid,
  Card,
  Container,
  Stack,
  Text,
  CardHeader,
  CardBody,
  Heading,
  Center,
  Button,
  CardFooter,
} from "@chakra-ui/react";
import { ST } from "next/dist/shared/lib/utils";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import DynamicNavBar from "../components/DynamicNavBar";

export default function FilesList() {
  const [files, setFiles] = useState([]);
  const router = useRouter();
  const token = Cookie.get("token");
  const decoded = jwt.decode(token, process.env.SECRET_KEY);
  const displayImage = () => {
    return files.map((file) => {
      return (
        <>
            <Card bg="#D6E4E5" maxW="sm" key={file._id}>
              <CardHeader>
                <Image
                  borderRadius="lg"
                  src={`${process.env.API_URL}/file/download/${file._id}`}
                />
              </CardHeader>
              <CardBody>
                <Heading>{file.nombre}</Heading>
                <Heading size="md" fontWeight="bold">
                  {file.url}
                </Heading>
                <CardFooter>
                  <Button 
                  onClick={() => ocultarImagen()}
                  >
                    Pago aprobado
                </Button>
                </CardFooter>
              </CardBody>
            </Card>
        </>
      );
    });
  };

  const getFiles = async () => {
    const response = await axios.get(`${process.env.API_URL}/files`);
    setFiles(response.data);
    console.log(response);
  };

  function ocultarImagen() {
    var imagen = document.getElementById("imagen");
    imagen.style.display = "none";
  }
  useEffect(() => {
    getFiles();
  }, []);

  return (
    <>
      <DynamicNavBar />
      <Container>
          <Stack>
            {displayImage()}
          </Stack>
      </Container>
    </>
  );
}
