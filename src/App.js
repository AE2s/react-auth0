import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Private from './Private';
import Courses from './Courses';
import Public from './Public';
import Nav from './Nav';
import Auth from './Auth/Auth';
import Callback from './Callback';
import AuthContext from './AuthContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
    };
  }
  render() {
    const { auth } = this.state;
    return (
      <AuthContext.Provider value={auth}>
        <Nav />
        <div className="body">
          <Route
            path="/"
            exact
            render={(props) => <Home auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={(props) => <Callback auth={auth} {...props} />}
          />
          <Route
            path="/profile"
            render={(props) =>
              auth.isAuthenticated() ? (
                <Profile auth={auth} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/public" component={Public} />
          <Route
            path="/private"
            render={(props) =>
              auth.isAuthenticated() ? (
                <Private auth={auth} {...props} />
              ) : (
                auth.login()
              )
            }
          />
          <Route
            path="/courses"
            render={(props) =>
              auth.isAuthenticated() && auth.userHasScopes(['read:courses']) ? (
                <Courses auth={auth} {...props} />
              ) : (
                auth.login()
              )
            }
          />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
