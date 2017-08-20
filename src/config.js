module.exports = {
  PORT: process.env.PORT || 3000,
  // other stuff
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL ||
  	'https://intense-bayou-56203.herokuapp.com' ||
    "http://localhost:8080"
};