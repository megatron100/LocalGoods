export interface Country {
  error: boolean;
  msg: string;
  data: CountryName[];
}

export interface CountryName {
  name: string;
}
