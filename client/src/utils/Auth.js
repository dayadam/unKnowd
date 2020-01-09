import axios from "axios";

function Auth() {
  function logIn(email, password, cb) {
    //code goes here
    axios
      .post("/api/authenticate", { email: email, password: password })
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        cb(response.data);
        alert("Welcome back! " + response.data.email);
        window.location = "/mainpage";
      });
  }

  function register(email, password, first, last, cb) {
    console.log("register");
    axios
      .post("/api/signup", {
        email: email,
        password: password,
        firstName: first,
        lastName: last
      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function event(title, description, address, lat, lon, cb) {
    console.log("Event Created");
    axios
      .post("/api/EventForm", {
        title: title,
        description: description,
        address: address,
        lat: lat,
        lon: lon
      })
      .then(function(data) {
        console.log(data);
        alert("Success!");
        window.location = "/mainpage";
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function logOut(cb) {
    localStorage.removeItem("token");
    cb();
  }

  function getToken() {
    return localStorage.getItem("token");
  }

  function isLoggedIn() {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  return {
    isLoggedIn,
    logIn,
    logOut,
    getToken,
    register,
    event
  };
}

export default Auth();
