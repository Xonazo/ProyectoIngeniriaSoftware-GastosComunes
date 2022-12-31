import React from "react";
import DynamicNavBar from "../components/DynamicNavBar";
import {
  Container,
  Image,
  Box,
  Text,
  Grid,
  GridItem,
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
              Sed in eros nisl. Integer pharetra aliquam ante, ac placerat lacus
              sodales in. Suspendisse blandit egestas sem eu efficitur. In non
              massa sit amet dui volutpat laoreet sit amet in augue. Maecenas
              vitae nisl dapibus, laoreet libero ut, semper nisi. In egestas,
              ante eget interdum ultricies, massa sapien mattis est, eget
              iaculis massa leo euismod eros. Donec ac nisl mi. Nam pellentesque
              tincidunt eros vel efficitur. In sapien nunc, placerat eu tortor
              id, posuere dictum quam. Suspendisse ac euismod tortor, at dictum
              nunc. Phasellus cursus venenatis metus vitae suscipit.{" "}
            </Text>
          </Flex>
        </Grid>
      </Container>
    </>
  );
}

export default about;
