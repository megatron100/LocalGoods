export interface FormData {
  controls: Control[];
}

export interface Control {
  name: string;
  label: string;
  value: string;
  type: string;
  rows: string;
  cols: string;
  required: boolean;
  validators: Validators;
  options: Options;
  isPassIsVisible: boolean;
}

interface Validators {
  required?: boolean;
  requiredTrue?: boolean;
  minLength?: number;
  maxLength?: boolean;
  message?: string;
  pattern?: string;
  nullValidator?: boolean;
}

interface Options {
  value?: string[];
  name?: string[];
}
