import { gql } from '@apollo/client';

export const GET_COUNTRY = gql`
  query GetCountry($countryCode: ID!) {
    country(code: $countryCode) {
      awsRegion
      capital
      code
      continent {
        code
        name
      }
      currencies
      currency
      emoji
      emojiU
      languages {
        code
        name
        native
        rtl
      }
      name
      native
      phone
      phones
      states {
        code
        name
      }
      subdivisions {
        code
        name
      }
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
      capital
      emoji
      currency
      continent {
        name
      }
    }
  }
`;

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      name
      code
    }
  }
`;
