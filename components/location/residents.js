import Link from 'next/link';
import { SimpleGrid, Button, Heading } from "@chakra-ui/react";

const Residents = ({ residents }) => (
  <>
    <Heading as="h3" size="lg" mb={2}>Residents</Heading>
    <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="30px" p={8}>
      {residents?.map(resident => (
        <Link href={`/resident/[id]`} as={`/resident/${resident.id}`}
          key={`resident-${resident.id}`}>
          <a><Button colorScheme="teal" variant="link">{resident.name}</Button></a>
        </Link>
      ))}
    </SimpleGrid>
  </>
)

export default Residents