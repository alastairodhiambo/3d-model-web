import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "./Signup/Signup";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/update-profile">
                <UpdateProfile />
              </PrivateRoute>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/forgot-password">
                <ForgotPassword />
              </Route>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
