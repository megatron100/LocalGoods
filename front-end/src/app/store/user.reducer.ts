import * as UserAction from './user.actions'
import {User} from "../pages/auth/models/user.model";

export interface UserState {
  user: User | null,
}

const initialState: UserState = {
  user: null,
}

export function userReducer(
  state: UserState = initialState,
  {payload, type}: UserAction.UserActions
): UserState {
  switch (type) {
    case UserAction.CREATE_USER:
      return {
        ...state,
        user: payload
      };
    case UserAction.UPDATE_USER:
      const userData: {
        userId: string,
        email: string,
        role: string,
        nickName: string,
        _token: string,
        _refresh_token: string,
        _tokenExpirationDate: string,
        _refreshTokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData') || '{}');
      const updatedUser = new User(
        userData.userId,
        userData.email,
        userData.role,
        payload.basicInfo.name,
        userData._token,
        userData._refresh_token,
        new Date(userData._tokenExpirationDate),
        new Date(userData._refreshTokenExpirationDate),
        {pinCode: payload?.address.postCode, area: payload?.address?.area, city: payload?.address?.city, country: payload?.address?.country},
        payload.basicInfo.mobile
      )
      return {
        ...state,
        user: updatedUser
      };
    default:
      return state
  }
}
