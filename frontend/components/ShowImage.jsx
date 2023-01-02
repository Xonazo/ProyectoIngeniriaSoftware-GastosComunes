// Nav Bar importado
import DynamicNavBar from "../components/DynamicNavBar";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
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
  Image,
  Avatar,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";

//Iconos importados
import { AiFillEye } from "react-icons/ai";

const ShowImage = ({ fileId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        title="Ver imagen"
        as={AiFillEye}
        boxSize={{ base: "50", md: "35" }}
        onClick={onOpen}
        _hover={{
          bg: "#4ea39a",
          color: "white",
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Archivo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={`${process.env.API_URL}/file/download/${fileId}`} />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowImage;
