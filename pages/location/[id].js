import Link from 'next/link';
import { initializeApollo } from '../../lib/apolloClient';
import { GET_LOCATION, GET_RESIDENTS_COUNT } from '../../lib/queries'
import { Heading, Divider, Stack, Button } from "@chakra-ui/react";

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

export async function getServerSideProps({ params }) {
  const queryId = params.id;
  const apolloClient = initializeApollo()
  const locationPromise = apolloClient.query({ query: GET_LOCATION, variables: { id: queryId } })
  const residentsCountPromise = apolloClient.query({ query: GET_RESIDENTS_COUNT })

  const [locationData, residentsCountData] = [await locationPromise, await residentsCountPromise];

  return { props: { location: locationData.data.location, residentsCount: residentsCountData.data.characters.info.count } }
}


export default LocationPage;