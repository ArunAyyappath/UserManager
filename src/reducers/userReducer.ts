import { userConstants } from '../constants/userconstants';

const initalAppstate = {
  profile: {}
}

const userReducer = (state = initalAppstate, action: any) => {
  switch (action.type) {
    case userConstants.FETCH_USER: return {
      ...state,
      fetchingUserHasError: false,
      fetchingUser: true
    }
    case userConstants.FETCH_USER_SUCCESS: return {
      ...state,
      fetchingUser: false,
      fetchingUserHasError: false,
      profile: action.payload
    }
    case userConstants.FETCH_USER_FAILURE: return {
      ...state,
      fetchingUser: false,
      fetchingUserHasError: true,
      profile: {}
    }

    default: return state;
  }
}

export default userReducer;