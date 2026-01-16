import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

// ✅ Your Cognito Details
const poolData = {
  UserPoolId: "us-east-1_iaO2KOF1c",
  ClientId: "eglo36ubn6s5op6i95vcllao1",
};

const userPool = new CognitoUserPool(poolData);

// ✅ SIGN UP (with name & email)
export const signUp = (email, password, name) => {
  return new Promise((resolve, reject) => {
    const attributes = [
      new CognitoUserAttribute({ Name: "name", Value: name }),
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];

    userPool.signUp(email, password, attributes, null, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// ✅ CONFIRM SIGNUP (using code from email)
export const confirmSignUp = (email, code) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(code, true, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// ✅ LOGIN
export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => resolve(result),
      onFailure: (err) => reject(err),
    });
  });
};
