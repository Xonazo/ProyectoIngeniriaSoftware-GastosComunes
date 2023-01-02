// Nav Bar importado
import DynamicNavBar from "../components/DynamicNavBar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import ShowImage from "../components/ShowImage";
import Swal from "sweetalert2";
import {
    Container,
    Heading,
    Table,
    TableContainer,
    Thead,
    Tr,
    Td,
    Tbody,
    Center,
    Button,
    Avatar,
    Flex,
} from "@chakra-ui/react";

//Iconos importados
import { FaTrash } from "react-icons/fa";

export default function FilesList() {
    const [files, setFiles] = useState([]);
    const router = useRouter();
    const token = Cookie.get("token");
    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    const userId = decoded.sub;

    const displayImage = () => {
        return files
            .filter((file) => file.user === userId)
            .map((file) => {
                const shortUrl = extractNumberSubstring(file.url);
                return (
                    <>
                        <Tr
                            key={file._id}
                        >
                            <Td>
                                <Flex alignItems={"center"} justifyContent="center" gap={3}>
                                    <Avatar
                                        borderRadius={"50%"}
                                        borderColor="black"
                                        borderWidth="1px"
                                        bg={"#D6E4E5"}
                                        src={`https://robohash.org/${file.user}`}
                                    />
                                    <span>{file.nombre}</span>
                                </Flex>
                            </Td>
                            <Td textAlign={"center"}>{shortUrl}</Td>
                            <Td display={"flex"} justifyContent="center">
                                <ShowImage fileId={file._id} />
                            </Td>
                            <Td>
                                <Center>
                                    <Button
                                        title="Eliminar comprobante"
                                        _hover={{
                                            bg: "#8E1113",
                                            color: "white",
                                        }}
                                        as={FaTrash}
                                        boxSize={{ base: "50", md: "35" }}
                                        onClick={() => deleteFileConfirmation(file._id)}>
                                    </Button>
                                </Center>
                            </Td>
                        </Tr>
                    </>
                );
            });
    };

    const getFiles = async () => {
        const response = await axios.get(`${process.env.API_URL}/files`);
        setFiles(response.data);
        console.log(response);
    };

    useEffect(() => {
        getFiles();
    }, []);

    function extractNumberSubstring(url) {
        const match = url.match(/\d+/);
        if (!match) {
            return "";
        }
        const start = url.indexOf(match[0]);
        const end = url.indexOf("-", url.indexOf("-", url.indexOf("-", url.indexOf("-", url.indexOf("-", start) + 1) + 1) + 1) + 1);
        if (end === -1) {
            return "";
        }
        return url.substring(start, end);
    }
    const deleteFileConfirmation = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFile(id);
                Swal.fire({
                    title: "Eliminado",
                    text: "El archivo ha sido eliminado",
                    icon: "success",
                })
            }
        });
    }

    const deleteFile = async (id) => {
        const response = await axios.delete(
            `${process.env.API_URL}/file/delete/${id}`);
        getFiles();
    }

    return (
        <>
            <DynamicNavBar />
            <Container
                bg={"#D6E4E5"}
                margin=" 3rem auto"
                p={"3rem"}
                borderRadius={"1rem"}
                maxW={"container.md"}
            >
                <Heading
                    textTransform={"uppercase"}
                    textAlign="center"
                    marginBottom={"1rem"}
                >
                    Lista de comprobantes
                </Heading>
                <TableContainer>
                    <Table>
                        <Thead bg={"#b9d1d3"}>
                            <Tr fontWeight={"bold"}>
                                <Td textAlign={"center"}>Nombre</Td>
                                <Td textAlign={"center"}>Fecha</Td>
                                <Td textAlign={"center"}>Ver</Td>
                                <Td textAlign={"center"}>Eliminar</Td>
                            </Tr>
                        </Thead>
                        <Tbody>{displayImage()}</Tbody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}