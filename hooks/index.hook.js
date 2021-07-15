import { SEARCH_LOCATIONS } from '../lib/locationQueries';
import { initializeApollo } from '../lib/apolloClient';
import { useToast } from "@chakra-ui/react";

const useSearchLocations = (setLocations) => {

  const toast = useToast();
  const onSearch = async ({ searchDimension, searchType }) => {
    try {
      const { data } = await initializeApollo().query({
        query: SEARCH_LOCATIONS,
        variables: { dimension: searchDimension, type: searchType }
      });
      setLocations(data.locations.results);

    } catch (error) {
      console.log('error:   ', error);
      if (error) {
        toast({
          position: "bottom",
          title: "Rick And Morty",
          description: "No Locations Found",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }

  return {
    onSearch
  }
}

export default useSearchLocations;