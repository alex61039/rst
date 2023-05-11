import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import './assets/scss/all.scss';
import Header from './components/header';
import Auth from './pages/Auth/auth';
import Main from './pages/Main/main';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import ForgotPassword from './pages/Auth/auth.forgot';
import RegisterSuccess from './pages/Auth/auth.success';
import RecoverPassword from './pages/Auth/auth.recover';
import LoadingBar from 'react-redux-loading-bar'
import Cookies from "cookies-js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayButton: false
    }
    let accessToken = Cookies.get("access_token");

    if (props.location.pathname === "/") {
      window.location.href = '/profile'
    }

    if (props.location.pathname === '/auth' && accessToken) {
      window.location.href = '/profile'
    }
  }

  componentDidMount() {
    if (this.props.location.pathname === "/" || this.props.location.pathname.indexOf("profile") !== -1) {
      this.setState({ isDisplayButton: true })
    } else {
      this.setState({ isDisplayButton: false })
    }
  }

  render() {
    return (
      <div className="l-wrapper">
        <LoadingBar style={{ backgroundColor: '#B0BAC4', height: '3px' }} />
        <ReactNotification />
        <Header calendar={true} button={this.state.isDisplayButton} />
        <main>
          <div className="container">
            <Router>
              <Switch>
                <Route exact path="/forgot" component={ForgotPassword} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/auth/confirm" component={RegisterSuccess} />
                <Route exact path="/auth/recover/:id?/:code?" component={RecoverPassword} />
                <Route path="/" component={Main} />
              </Switch>
            </Router>
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
