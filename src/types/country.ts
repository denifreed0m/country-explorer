export interface Continent {
  code: string;
  name: string;
}

export interface Language {
  code: string;
  name: string;
  native: string;
  rtl: boolean;
}

export interface State {
  code: string;
  name: string;
}

export interface Subdivision {
  code: string;
  name: string;
}

export interface Country {
  awsRegion: string;
  capital: string | null;
  code: string;
  continent: Continent;
  currencies: string[];
  currency: string | null;
  emoji: string;
  emojiU: string;
  languages: Language[];
  name: string;
  native: string;
  phone: string;
  phones: string[];
  states: State[];
  subdivisions: Subdivision[];
}

export interface CountryData {
  country: Country | null;
}
