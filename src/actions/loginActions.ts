import { authConstants } from '../constants/authconstants';
import axios from 'axios';

// ** User login
export const tryLogin = (userCredentials: any) => {
  return (dispatch: Function) => {
    dispatch(initiateLogin())
    axios.post(`https://devgroceryapi.spericorn.com/api/auth/login`, userCredentials)
      .then((res) => {
        const { data: response } = res;
        if (response.success) {
          const { data: { userData, token } } = response;
          localStorage.setItem('token', token);
          dispatch(loginSuccess(userData));
        } else {
          dispatch(loginFailure(response));
        }
      }, (error) => {
        dispatch(loginFailure(error))
      });
  }
}

export const initiateLogin = () => {
  return {
    type: authConstants.TRY_LOGIN,
    payload: ''
  }
}

export const loginSuccess = (response: any) => {
  return {
    type: authConstants.LOGIN_SUCCESS,
    payload: response
  }
}

export const loginFailure = (response: any) => {
  return {
    type: authConstants.LOGIN_FAILURE,
    payload: response.message
  }
}
// ** User registration
export const tryRegister = (userCredentials: any) => {
  return (dispatch: Function) => {
    dispatch(initiateRegister())
    axios.post(`https://devgroceryapi.spericorn.com/api/auth/register`, userCredentials)
      .then((res: any) => {
        const { data: response } = res;
        if (response.success) {
          const { data: { userData, token } } = response;
          localStorage.setItem('token', token);
          dispatch(registerSuccess(userData));
        } else {
          dispatch(registerFailure(response));
        }
      }, (error) => {
        dispatch(registerFailure(error))
      });
  }
}

export const initiateRegister = () => {
  return {
    type: authConstants.REGISTER,
    payload: ''
  }
}

export const registerSuccess = (response: any) => {
  return {
    type: authConstants.REGISTER_SUCCESS,
    payload: response
  }
}

export const registerFailure = (response: any) => {
  return {
    type: authConstants.REGISTER_FAILURE,
    payload: response.message
  }
}

export const isEmailPreExist = (email: string) => {
  return (dispatch: Function) => {
    dispatch(checkEmailExistance())
    axios.post(`https://devgroceryapi.spericorn.com/api/auth/checkMail`, { ...{ email } })
      .then((res: any) => {
        const { data: response } = res;
        if (response.success) {
          dispatch(checkEmailExistanceSuccess(response.message));
        } else {
          dispatch(checkEmailExistanceFailure(response));
        }
      }, (error) => {
        dispatch(checkEmailExistanceFailure(error))
      });
  }
}

export const checkEmailExistance = () => {
  return {
    type: authConstants.CHECK_MAIL_EXSISTANCE,
    payload: ''
  }
}

export const checkEmailExistanceSuccess = (response: any) => {
  return {
    type: authConstants.CHECK_MAIL_SUCCESS,
    payload: response
  }
}

export const checkEmailExistanceFailure = (response: any) => {
  return {
    type: authConstants.CHECK_MAIL_FAILURE,
    payload: response.message
  }
}

export const logOut = () => {
  return {
    type: authConstants.LOG_OUT,
    payload: ''
  }
}