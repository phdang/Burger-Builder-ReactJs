import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const formSubmitStart = () => ({type:actionTypes.FORM_SUBMIT_START});
export const formSubmitSuccess = (data) => ({type:actionTypes.FORM_SUBMIT_SUCCESS, data: data});
export const formSubmitFail = (error) => ({type:actionTypes.FORM_SUBMIT_FAIL, error: error});
export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {type:actionTypes.AUTH_LOG_OUT}
};
export const checkAuthTimeout = (expirationTime) => dispatch => {
  setTimeout(() => dispatch(logout()), expirationTime * 1000)
}

export const formSubmit = (url, credentials) => dispatch => {

dispatch(formSubmitStart());

  axios.post(url, credentials).then(res => {
    const expirationTime = new Date().getTime() + res.data.expiresIn * 1000;
    localStorage.setItem('token', res.data.idToken);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('userId', res.data.localId);

    dispatch(formSubmitSuccess(res.data));
    dispatch(checkAuthTimeout(res.data.expiresIn));


  }).catch(err => {

    dispatch(formSubmitFail(err.response.data.error.message));

  });
}
export const resetErrorForm = () => ({type: actionTypes.RESET_ERROR_FORM});
export const verifySignin = (idToken, userId) => ({type: actionTypes.VERIFY_SIGN_IN, token: idToken, userId: userId});
export const autoSignin = () => dispatch => {

  const token = localStorage.getItem('token');
  const expireTime = localStorage.getItem('expirationTime');
  const localId = localStorage.getItem('userId');
  if (!token || !expireTime || !localId) {
    dispatch(logout());

  } else {
    if (new Date().getTime() <= expireTime) {

      dispatch(verifySignin(token, localId));
      dispatch(checkAuthTimeout((expireTime - new Date().getTime())/1000));

    } else {

      dispatch(logout());
    }
  }
}
