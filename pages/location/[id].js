import Link from 'next/link';
import { initializeApollo } from '../../lib/apolloClient';
import { Heading, Divider, Stack, Button } from "@chakra-ui/react";

import { GET_RESIDENTS_COUNT } from '../../lib/residentsQueries'
import { GET_LOCATIONS_PAGES, GET_LOCATIONS_BY_PAGE, GET_LOCATION } from '../../lib/locationQueries'
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
  const { data: pagesData } = await apolloClient.query({ query: GET_LOCATIONS_PAGES })

  const locationsP = [];
  for (let page = 1; page < pagesData.locations.info.pages; page++) {
    locationsP.push(apolloClient.query({ query: GET_LOCATIONS_BY_PAGE, variables: { page } } ));
  }

  const locationsPages = await Promise.all(locationsP);
  const locationsPagesIds = [].concat(...locationsPages.map(page => page.data.locations.results.map( result => result.id )))
  
  const paths = locationsPagesIds.map( id => ({ params: { id: id }} ))

  return { paths, fallback: false }
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