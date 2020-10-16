import { userConstants } from '../constants/userconstants';
import axios from 'axios';

export const fetchUser = (token: string) => {
  return (dispatch: Function) => {
    dispatch(initiatefetchUser())
    axios.get('https://devgroceryapi.spericorn.com/api/user', { headers: { 'Authorization': token } })
      .then((res) => {
        const { data: response } = res;
        if (response.success) {
          const { data: { userData } } = response;
          dispatch(fetchUserSuccess(userData));
        } else {
          dispatch(fetchUserFailure(response));
        }
      }, (error) => {
        dispatch(fetchUserFailure(error))
      });
  }
}

export const initiatefetchUser = () => {
  return {
    type: userConstants.FETCH_USER,
    payload: ''
  }
}

export const fetchUserSuccess = (response: any) => {
  return {
    type: userConstants.FETCH_USER_SUCCESS,
    payload: response
  }
}

export const fetchUserFailure = (response: any) => {
  return {
    type: userConstants.FETCH_USER_FAILURE,
    payload: response.message
  }
}