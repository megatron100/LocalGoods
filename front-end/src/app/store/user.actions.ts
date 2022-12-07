import {Action} from "@ngrx/store";
import {User} from "../pages/auth/models/user.model";

export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export class CreateUser implements Action{
  readonly type = CREATE_USER;

  constructor(public payload: User | null) {
  }
}

export class UpdateUser implements Action{
  readonly type = UPDATE_USER;

  constructor(public payload: {
    "address": {
      "postCode": string,
      "country": string,
      "city": string,
      "area": string
    },
    "basicInfo": {
      "name": string,
      "mobile": string
    }
  }) {
  }
}


export type UserActions = CreateUser | UpdateUser
