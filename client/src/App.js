import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
}from "react-router-dom";
import Login from "./components/Login";
import AddRoom from "./components/AddRoom";
import ChatRoom from "./components/ChatRoom";
import RoomList from "./components/RoomList";

function App() {
let location = useLocation();

  return (
    <Router>
      <div>
        <Redirect
          to={{
            pathname:"/roomList",
            state: { from: location }
          }}
        />
        <Switch>
          <Route path="/login" component={Login} />
          <SecureRoute path="/roomList"><RoomList /></SecureRoute>
          <SecureRoute path="/addRoom"><AddRoom /></SecureRoute>
          <SecureRoute path="/chatRoom/:room"><AddRoom /></SecureRoute>
        </Switch>
      </div>

      </Router>
  );
}

export default App;

function SecureRoute({ children, ...rest }) {
  return (
    <Route 
      {...rest}
      render={({ location }) =>
        localStorage.getItem('nickname') ? (
          children 
        ) : (
          <Redirect
          to={{
            pathname: "/login",
            state: { from: location}
          }}
          />
        )
      }
    />
  )
}
