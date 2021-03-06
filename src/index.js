import React, { useState, useContext } from 'react';
import { Router, Switch, Route } from "react-router";
import { Link, render } from "react-dom";
import { createBrowserHistory } from "history";
import Cookies from "js-cookie";

const history = createBrowserHistory();

/*const Dashboard = () => {
  const { session } = useContext(SessionContext);

  if (!session) return null;

  return <div>Dashboard</div>
};*/

const LoginHandler = ({ history }) => {
  const session = useContext(SessionContext);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const loggedIn = true;//await ....
    if (loggedIn) {
      setEmail({ email });
      session.setSession({ email });
      Cookies.remove('cwsSession');
      Cookies.set('cwsSession', email, { expires: 7 });
      setLoading(false);
      history.push('/');
    }
  };

  if (loading) {
    return <h4>Logging in...</h4>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

const LogoutHandler = ({ history }) => {
  Cookies.remove('cwsSession');


  return (
    <div>LogoutHandler</div>
  );
}

const ProtectedHandler = ({ history }) => {
  const { session } = useContext(SessionContext);
  const sessionFunctions = useContext(SessionContext);
  console.log('ProtectedHandler session: ', session);
  console.log('ProtectedHandler sessionFunctions: ', sessionFunctions);

  if (session.email === undefined) {
    console.log('session.email === undefined');

    return (
      <div>
        {LoginHandler({ history })}
      </div>
    );
  } /*else if (!session.email) {
    const cookie = Cookies.get('cwsSession');
    contextSession.setSession(cookie);
  }*/

  return (
    <div>
      <div>ProtectedHandler for {session.email}</div>
    </div>
  );
}

const SessionContext = React.createContext({
  session: {},
  setSession: () => {},
});

const Routes = () => {
  const [session, setSession] = useState({});
  const contextSession = {
    session,
    setSession
  };

  return (
    <SessionContext.Provider value={contextSession}>
      <Router history={history}>
        <div className="navbar">
          <h6 style={{ display: "inline" }}>Nav Bar</h6>
          <h6 style={{ display: "inline", marginLeft: "5rem" }}>
            {session.email || "No user is logged in"}
          </h6>
        </div>
        <Switch>
          <Route path="/login" component={LoginHandler} />
          <Route path="/logout" component={LogoutHandler} />
          <Route path="*" component={ProtectedHandler} />
        </Switch>
      </Router>
    </SessionContext.Provider>
  );
}

const App = () => (
  <div className="App">
    <Routes />
  </div>
);

const rootElement = document.getElementById("root");
render(<App />, rootElement);
