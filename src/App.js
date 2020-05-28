import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Nav from './Nav';

function App() {
  return (
    <>
      <Nav />
      <div className="body">
        <Route path="/" component={Home} exact />
        <Route path="/profile" component={Profile} />
      </div>
    </>
  );
}

export default App;
