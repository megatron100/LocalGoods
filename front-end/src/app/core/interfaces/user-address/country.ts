export interface Country {
  error: boolean;
  msg: string;
  data: CountryName[];
}

interface CountryName {
  name: string;
}
