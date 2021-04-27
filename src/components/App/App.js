import { AuthProvider } from "../../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "../Signup/Signup";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import UpdateProfile from "../Dashboard/UpdateProfile";
import PrivateRoute from "../PrivateRoute";
import Homepage from "../Homepage/Homepage";
import Models from "../Models/Models";
import Model from "../Model/Model";
import NewModel from "../NewModel/NewModel";
import Header from "./Header";
import Footer from "./Footer";

import "./App.scss";

function App() {
  return (
    <section className="main">
      <Router>
        <AuthProvider>
          <Header />
          <div className="main-content">
            <Switch>
              <Route exact path="/" component={Homepage} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/models" component={Models} />
              <Route path="/model/:id" component={Model} />
              <Route path="/new-model" component={NewModel} />
            </Switch>
          </div>
          <Footer />
        </AuthProvider>
      </Router>
    </section>
  );
}

export default App;
