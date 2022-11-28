export class RegisterModel {
  constructor(
    public nikName: string,
    public email: string,
    public password: string,
    public confirmPass: string,
    public role: string
  ) {
  }
}
