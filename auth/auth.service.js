const aws = require("aws-sdk");
const cognito = require("amazon-cognito-identity-js");

const poolData = {
  UserPoolId: process.env.USERPOOL_ID,
  ClientId: process.env.CLIENT_ID,
};

const pool_region = process.env.POOL_REGION;

const userPool = new cognito.CognitoUserPool(poolData);

//register user

exports.Register = function (body, callback) {
  var name = body.name;
  var email = body.email;
  var password = body.password;
  var attributeList = [];

  attributeList.push(
    new cognito.CognitoUserAttribute({ Name: "email", Value: email })
  );
  userPool.signUp(email, password, attributeList, null, function (err, result) {
    if (result ? [name, email, password] && callback(result) : callback(err));
  });
};

//verify user
exports.verify = function (email) {
  const userData = {
    Username: email,
    Pool: userPool,
  };
  return new cognito.CognitoUser(userData);
};

//login user
exports.Login = function (body, callback) {
  var userName = body.email;
  var password = body.password;
  var authenticationDetails = new cognito.AuthenticationDetails({
    Username: userName,
    Password: password,
  });
  var userData = {
    Username: userName,
    Pool: userPool,
  };
  var cognitoUser = new cognito.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var accesstoken = result.getAccessToken().getJwtToken();
      callback(null, accesstoken);
    },
    onFailure: function (err) {
      callback(err);
    },
  });
};
