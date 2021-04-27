import React, { Component } from "react";

export default class UserOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.currentUser = props.currentUser;
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    if (this.state.width < 480) {
      return null;
    }

    if (this.currentUser) {
      return (
        <div id="user-options">
          <a href="/dashboard">
            <span>{this.currentUser}</span>
            <i className="fas fa-user-circle"></i>
          </a>
        </div>
      );
    }

    return (
      <div id="user-options">
        <a href="/login">
          <span>Log In</span>
          <i className="fas fa-user-circle"></i>
        </a>
        <span>or</span>
        <a href="/signup">
          <span>Register</span>
        </a>
      </div>
    );
  }
}
