export interface Continent {
  name: string;
}

export interface Country {
  code: string;
  name: string;
  capital: string;
  emoji: string;
  currency: string;
  continent: Continent;
}

export interface CountriesData {
  countries: Country[];
}

export interface StringQueryOperatorInput {
  eq?: string;
  in?: string[];
  ne?: string;
  nin?: string[];
  regex?: string;
}

export interface CountryFilterInput {
  code?: StringQueryOperatorInput;
  continent?: StringQueryOperatorInput;
  currency?: StringQueryOperatorInput;
  name?: StringQueryOperatorInput;
}
