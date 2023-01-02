import React from "react";
import DynamicNavBar from "../components/DynamicNavBar";
import {
  Container,
  Image,
  Text,
  Grid,
  Heading,
  Flex,
} from "@chakra-ui/react";

function about() {
  return (
    <>
      <DynamicNavBar />
      <Container
        marginTop={"4rem"}
        bg="rgb(180 180 180 / 70%)"
        maxW="container.xl"
        p={30}
        borderRadius="10"
      >
        <Heading 
        textAlign={"center"} 
        size="3xl"
        textTransform={"uppercase"}
        fontWeight='light'
        letterSpacing={'4px'}
        marginBottom= '1rem'
        >
          Sobre nosotros
        </Heading>
        <Grid templateColumns={{ md: "50% 49%" }} gap="5" marginTop={"1rem"}>
          <Image src="/c2About.png" width={"100rem"} borderRadius="1rem" />
          <Flex
            alignItems={"center"}
            p={5}
            bg={"rgb(204 204 204 / 80%)"}
            borderRadius="1rem"
          >
            <Text>
              Empresa dedicada a la administración de gastos comunes de condominios a lo largo de Chile
              <br />
              Nelson Rubio nelson.rubio1901@alumnos.ubiobio.cl
              <br />
              Edison Muñoz edison.munoz1901@alumnos.ubiobio.cl
              <br />
              Matias San Martin matias.san1901@alumnos.ubiobio.cl
              <br />
              Domingo Vega domingo.vega1901@alumnos.ubiobio.cl
            </Text>
          </Flex>
        </Grid>
      </Container>
    </>
  );
}

export default about;
