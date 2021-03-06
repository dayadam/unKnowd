import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import authenticatedAxios from "./utils/AuthenticatedAxios";
import LoginPage from "./pages/LoginPage";
import UserContext from "./context/UserContext";
import Mainpage from "./pages/Main";
import Viewer from "./pages/Viewer";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import "./app.scss";

const NotFound = () => (
  <div
    className="container is-center"
    style={{
      height: "100vh",
      maxWidth: "600px",
      paddingTop: "0",
      marginTop: "0"
    }}
  >
    <div className="columns is-vcentered" style={{ height: "100%" }}>
      <div className="column">
        <div className="box">
          <h1>404 NOT FOUND</h1>
          <h3>Looks like you got lost along the way</h3>
        </div>
      </div>
    </div>
  </div>
);
class App extends Component {
  state = {
    user: null
  };

  setUser = user => {
    this.setState({ user });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      authenticatedAxios
        .get("/api/me")
        .then(response => this.setUser(response.data));
    }
  }

  render() {
    const { user } = this.state;
    const setUser = this.setUser;
    return (
      <Router>
        <div>
          <UserContext.Provider
            value={{
              user: user,
              setUser: setUser
            }}
          >
            <Switch>
              <ProtectedRoute exact path="/mainpage" component={Mainpage} />
              <Route exact path="/viewer" component={Viewer} />
              <ProtectedRoute exact path="/profile" component={UpdateProfile} />
              <Route
                exact
                path="/"
                user={this.state.user}
                component={LoginPage}
              />
              <Route component={NotFound} />
            </Switch>
          </UserContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
