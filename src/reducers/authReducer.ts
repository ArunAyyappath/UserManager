import { authConstants } from '../constants/authconstants';

const isUserLoggedIn = () => (localStorage.getItem('token') ? true : false);

const initalAppstate = {
  loggedIn: isUserLoggedIn()
}

const authReducer = (state = initalAppstate, action: any) => {
  switch (action.type) {
    case authConstants.TRY_LOGIN: return {
      ...state,
      loginInitiated: true,
      loginhasError: false,
    }
    case authConstants.LOGIN_SUCCESS: return {
      ...state,
      loggedIn: true,
      loginInitiated: false,
      loginhasError: false,
      userData: action.payload
    }
    case authConstants.LOGIN_FAILURE: return {
      ...state,
      loggedIn: false,
      loginInitiated: false,
      loginhasError: action.payload,
      userData: {}
    }
    case authConstants.REGISTER: return {
      ...state,
      loggedIn: false,
      registerInitiated: true,
      registerhasError: false,
    }
    case authConstants.REGISTER_SUCCESS: return {
      ...state,
      loggedIn: true,
      registerInitiated: false,
      registerhasError: false,
      userData: action.payload
    }
    case authConstants.REGISTER_FAILURE: return {
      ...state,
      loggedIn: false,
      registerInitiated: false,
      registerhasError: action.payload,
      userData: {}
    }
    case authConstants.CHECK_MAIL_EXSISTANCE: return {
      ...state,
      isEmailValid: false,
      emailStatus: ''
    }
    case authConstants.CHECK_MAIL_SUCCESS: return {
      ...state,
      isEmailValid: true,
      emailStatus: action.payload
    }
    case authConstants.CHECK_MAIL_FAILURE: return {
      ...state,
      isEmailValid: false,
      emailStatus: action.payload
    }

    case authConstants.LOG_OUT: return {
      ...state,
      loggedIn: false
    }

    default: return state;
  }

}

export default authReducer;