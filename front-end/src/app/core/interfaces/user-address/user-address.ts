export interface UserAddress<T> {
  error: boolean;
  msg: string;
  data: T;
}

export interface CountryName {
  name: string;
}

export interface StateData {
  name: string;
  iso3: string;
  iso2: string;
  states: State[];
}

interface State {
  name: string;
  state_code: string;
}

export interface DialCode {
  name: string;
  code: string;
  dial_code: string;
}
