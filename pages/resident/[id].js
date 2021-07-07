import Link from 'next/link';
import { Button, Avatar, Stack, GridItem, Grid, Divider } from "@chakra-ui/react";

import { initializeApollo } from '../../lib/apolloClient';
import { GET_RESIDENT, GET_RESIDENTS } from '../../lib/queries'
import LabelField from '../../components/generics/labelField'

const ResidentPage = ({ resident }) => (
  <Stack direction="column">
    <Stack direction="row" spacing={4} p={8} align="center" justify="center">
      <Link href={`/`}>
        <a><Button colorScheme="teal" variant="link">Search Locations</Button></a>
      </Link>

      <Link href={`/location/[id]`} as={`/location/${resident.location.id}`}>
        <a><Button colorScheme="teal" variant="link">{resident.location.name}</Button></a>
      </Link>
    </Stack>
    
    <Divider mb={4}/>

    <Grid
      templateColumns="repeat(6, 1fr)"
      gap={8}
    >
      <GridItem colSpan={2} >
        <Avatar size="4xl" name={resident.name} src={resident.image} />
      </GridItem>
      <GridItem colSpan={4} mt={4}>
        <LabelField label={'Name:'} value={resident.name} />
        <LabelField label={'Gender:'} value={resident.gender} />
        <LabelField label={'Status:'} value={resident.status} />
        <LabelField label={'Species:'} value={resident.species} />
      </GridItem>
    </Grid>
  </Stack>
)


export const getStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query({ query: GET_RESIDENTS })
  const paths = data.characters.results.map(character => ({
    params: { id: character.id },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const queryId = params.id;
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query({ query: GET_RESIDENT, variables: { id: queryId } })

  const props =   { resident: data.character, queryId }
  
  return { props }
}

export default ResidentPage;