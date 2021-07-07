import React, { useState } from 'react';
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { IconButton, Divider, Stack } from "@chakra-ui/react";

import { initializeApollo } from '../lib/apolloClient';
import Locations from "../components/location/locations";
import SearchField from "../components/generics/searchField";
import { SEARCH_LOCATIONS } from '../lib/queries';

import useSearchLocations from '../hooks/index.hook';

const IndexPage = (results) => {
  const intialState = results;
  const [locations, setLocations] = useState(intialState.locations);
  const [searchDimension, setSearchDimension] = useState("");
  const [searchType, setSearchType] = useState("");
  const { onSearch } = useSearchLocations(setLocations);

  return (
    <Stack direction="column" p={4} align="center">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          onSearch({ searchDimension, searchType })
        }}
      >
        <SearchField
          placeholder='Search by Dimension'
          search={searchDimension}
          onInputChange={(e) => setSearchDimension(e.target.value)}
        />
        <SearchField
          placeholder='Search by Type'
          search={searchType}
          onInputChange={(e) => setSearchType(e.target.value)}
        />
        <IconButton
          colorScheme="blue"
          aria-label="Search database"
          icon={<SearchIcon />}
          disabled={searchDimension === "" && searchType === ""}
          type="submit"
        />
        <IconButton
          colorScheme="red"
          aria-label="Reset "
          icon={<CloseIcon />}
          disabled={searchDimension === "" && searchType === ""}
          onClick={async () => {
            setSearchDimension("");
            setSearchType("");
            setLocations(intialState.locations);
          }}
        />
      </form>
      <Divider m={4} />
      <Locations locations={locations} />
    </Stack>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query({ query: SEARCH_LOCATIONS });
  return {
    props: {
      locations: data.locations.results,
    },
  };
}

export default IndexPage;