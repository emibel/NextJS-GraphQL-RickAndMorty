import Link from 'next/link';
import { initializeApollo } from '../../lib/apolloClient';
import { Heading, Divider, Stack, Button } from "@chakra-ui/react";

import { GET_LOCATION, GET_RESIDENTS_COUNT, SEARCH_LOCATIONS } from '../../lib/queries'
import LabelField from '../../components/generics/labelField';
import Residents from '../../components/location/residents';
import LocationStats from '../../components/location/locationStats';

const LocationPage = ({ location, residentsCount }) => (
  <div>
    <Stack direction="column" p={4} align="center">
      <Link href={`/`}>
        <a><Button colorScheme="teal" variant="link">Search Locations</Button></a>
      </Link>
      <Divider />
      <Heading as="h3" size="lg" p={4}> {`Location: ${location.name}`} </Heading>
      <Divider />
      <LabelField label={'Dimension:'} value={location.dimension} />
      <LabelField label={'Type:'} value={location.type} />
      <Divider />
      <LocationStats location={location} residentsCount={residentsCount} />
      <Divider />
      <Residents residents={location.residents} />
    </Stack>
  </div>
)



export const getStaticPaths = async () => {

  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query({ query: SEARCH_LOCATIONS })

  const paths = data.locations.results.map(location => ({
    params: { id: location.id },
  }))

  return { paths, fallback: true }
}


export async function getStaticProps({ params }) {
  const queryId = params.id;
  const apolloClient = initializeApollo()
  const locationPromise = apolloClient.query({ query: GET_LOCATION, variables: { id: queryId } })
  const residentsCountPromise = apolloClient.query({ query: GET_RESIDENTS_COUNT })

  const [{ data: locationData }, { data: residentsCountData }] = [await locationPromise, await residentsCountPromise];

  return { props: { location: locationData.location, residentsCount: residentsCountData.characters.info.count } }
}

export default LocationPage;