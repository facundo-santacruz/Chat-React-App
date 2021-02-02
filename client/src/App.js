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
          <SecureRoute path="/roomList" component={RoomList} />
          <SecureRoute path="/addRoom" component={AddRoom} />
          <SecureRoute path="/chatRoom/:room" component={ChatRoom} />
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
        localStorage.get('nickname') ? (
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
