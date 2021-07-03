import React from "react";
import { Button, SimpleGrid, Heading } from "@chakra-ui/react";
import Link from 'next/link';

const Locations = ({ locations }) => (
  <>
    <Heading as="h3" size="lg" mb={2}>Locations</Heading>
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="30px" p={8}>
      {locations.map((location) => {
        return (
          <Link href={`/location/[id]`} as={`/location/${location.id}`}
            key={`location-${location.id}`}>
            <a><Button colorScheme="teal" variant="link">{location.name}</Button></a>
          </Link>
        );
      })}
    </SimpleGrid >
  </>
);

export default Locations;
