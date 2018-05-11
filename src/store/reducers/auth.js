import * as actionTypes from '../actions/actionTypes';
import updateState from '../utilities/utilities';

const initialState = {

  idToken: null,
  refreshToken: null,
  expiresIn: null,
  localId: null,
  error: null,
  loading: false

}

const reducer = (state = initialState, action) => {

    switch (action.type) {

      case actionTypes.FORM_SUBMIT_START:
        return updateState(state, {loading:true});
      case actionTypes.FORM_SUBMIT_SUCCESS:
        return updateState(state, {

          idToken: action.data.idToken,
          refreshToken: action.data.refreshToken,
          localId: action.data.localId,
          loading: false

        });
      case actionTypes.FORM_SUBMIT_FAIL:

        return updateState(state, {

          error: action.error,
          loading:false

        });

      case actionTypes.RESET_ERROR_FORM:
        return updateState(state, {error: null});

      case actionTypes.AUTH_LOG_OUT:
        return updateState(state, {idToken: null, localId: null, refreshToken: null});

      case actionTypes.VERIFY_SIGN_IN:
        return updateState(state, {idToken: action.token, localId: action.userId})

      default:

        return state;
  }
}

export default reducer;
