import Head from "next/head";
import { Heading, Container, Box, Flex } from "@chakra-ui/react";

const AppLayout = ({ children }) => {
  return (
    <Flex direction="column" justify="center" align="center">
      <Head>
        <title>Rick And Morty Exercise</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box mb={4} flexDirection="column" align="center" justify="center" py={8}>
        <Heading as="h1" size="2xl" mb={8}> Rick and Morty </Heading>
        <Container centerContent>
          {children}
        </Container>
      </Box>
    </Flex>
  )
}

export default AppLayout;