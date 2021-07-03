
import {
  Heading,
  Container,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber
} from "@chakra-ui/react";

const LocationStats = ({ location, residentsCount }) => {
  const countAlive = location.residents.filter(resident => resident.status === 'Alive').length;
  const countDead = location.residents.filter(resident => resident.status === 'Dead').length;

  const countRobots = location.residents.filter(resident => resident.species === 'Robot').length;
  const countAliens = location.residents.filter(resident => resident.species === 'Alien').length;
  const countHumans = location.residents.filter(resident => resident.species === 'Human').length;

  return (
    <>
      <Heading as="h3" size="lg" mb={2}>Statistics</Heading>
      <Container maxW="xl" p={4}>
        <StatGroup w='100%'>
          <Stat>
            <StatLabel>Alive</StatLabel> <StatNumber>{countAlive}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Dead</StatLabel> <StatNumber>{countDead}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Guests</StatLabel> <StatNumber>{residentsCount - location.residents.length}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Aliens</StatLabel> <StatNumber>{countAliens}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Robots</StatLabel> <StatNumber>{countRobots}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Humans</StatLabel> <StatNumber>{countHumans}</StatNumber>
          </Stat>
        </StatGroup>
      </Container>
    </>
  )
}

export default LocationStats;