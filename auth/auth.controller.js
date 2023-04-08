const authService = require("./auth.service");
const CognitoExpress = require("cognito-express");

const cognitoExpress = new CognitoExpress({
  region: process.env.POOL_REGION,
  cognitoUserPoolId: process.env.USERPOOL_ID,
  tokenUse: "access",
  tokenExpiration: 3600,
});

exports.validateAuth = (req, res, next) => {
  // Check that the request contains a token
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Validate the token
    const token = req.headers.authorization.split(" ")[1];
    cognitoExpress.validate(token, function (err, response) {
      if (err) {
        // If there was an error, return a 401 Unauthorized along with the error
        res.status(401).send("Token is not valid");
      } else {
        //Else API has been authenticated. Proceed.
        next();
      }
    });
  } else {
    // If there is no token, respond appropriately
    res.status(401).send("No token provided.");
  }
};

// register user
exports.register = function (req, res) {
  let register = authService.Register(req.body, function (err, result) {
    if (err) res.send(err);
    res.send(result);
  });
};

exports.Verify = function (req, res) {
  authService
    .verify(req.body.email)
    .confirmRegistration(req.body.code, true, (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
};

exports.login = function (req, res) {
  let login = authService.Login(req.body, function (err, result) {
    if (err) res.send(err);
    res.send(result);
  });
};
