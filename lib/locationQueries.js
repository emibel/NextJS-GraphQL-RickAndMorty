import { gql } from "@apollo/client";

export const SEARCH_LOCATIONS = gql`
  query GetLocations($dimension: String, $type: String) {
    locations(filter: { dimension: $dimension, type: $type }) {
      results {
        id
        name
      }
    }
  }
`;

export const GET_LOCATIONS_PAGES = gql`
  query LocationsPages {
    locations {
      info {
        pages
      }
    }
  }
`;

export const GET_LOCATIONS_BY_PAGE = gql`
  query LocationsByPage($page: Int) {
    locations(page: $page) {
      results {
        id
      }
    }
  }
`;

export const GET_LOCATION = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      id
      name
      dimension
      type
      residents {
        id
        name
        status
        species
      }
    }
  }
`;