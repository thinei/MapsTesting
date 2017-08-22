import { AsyncStorage } from "react-native";
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from "./types";
const FBSDK = require("react-native-fbsdk");
const { LoginManager, AccessToken } = FBSDK;

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem("fb_token");

  if (token) {
    //Dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    //Startup FB login process
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  LoginManager.logInWithReadPermissions(["public_profile"]).then(
    function(result) {
      if (result.isCancelled) {
        alert('Login cancelled');
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
      } else {
        alert('Login success with permissions: '+ result.grantedPermissions.toString());
        AccessToken.getCurrentAccessToken().then(data => {
          token = data.accessToken.toString();
          console.log(token);
          AsyncStorage.setItem("fb_token", token);
          dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
        });
      }
    },
    function(error) {
      alert("Login fail with error: " + error);
    }
  );

  //await AsyncStorage.setItem("fb_token", token);
  //dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
