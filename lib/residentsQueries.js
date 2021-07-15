import { gql } from "@apollo/client";

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
  query Residents {
    characters {
      results {
        id
      }
    }
  }
`;

export const GET_RESIDENTS_PAGES = gql`
  query ResidentsPages {
    characters {
      info {
        pages
      }
    }
  }
`;

export const GET_RESIDENTS_BY_PAGE = gql`
  query ResidentsByPage($page: Int) {
    characters(page: $page) {
      results {
        id
      }
    }
  }
`;


