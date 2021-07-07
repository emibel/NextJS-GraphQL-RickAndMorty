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

export const GET_RESIDENT = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      species
      gender
      status
      image
      location {
        id
        name
      }
    }
  }
`;

export const GET_RESIDENTS_COUNT = gql`
  query ResidentsCount {
    characters {
      info {
        count
      }
      results { id }
    }
  }
`;

export const GET_RESIDENTS = gql`
  query ResidentsCount {
    characters {
      results {
        id
      }
    }
  }
`;


