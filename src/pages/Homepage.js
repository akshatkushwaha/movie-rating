import React, { Component } from "react";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.location.href = "/popular/1";
  }

  render() {
    return <div>Homepage</div>;
  }
}
