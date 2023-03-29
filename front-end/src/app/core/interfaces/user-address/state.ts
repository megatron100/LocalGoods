export interface StateInfo {
  error: boolean;
  msg: string;
  data: StateData;
}

interface StateData {
  name: string;
  iso3: string;
  iso2: string;
  states: State[];
}

interface State {
  name: string;
  state_code: string;
}
