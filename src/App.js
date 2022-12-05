import React, { Component } from "react";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";

import fetchProfile from "./api/auth";
import { useSelector, useDispatch } from "react-redux";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      search: "",
    };
  }

  componentDidMount() {
    this.setUserData();
  }

  setUserData = async () => {
    const dispatch = useDispatch();
    const userDataSlice = useSelector((state) => state.userData);
    const data = await fetchProfile().then((res) => res.data);
    dispatch(userDataSlice.actions.setLoginStatus(data));
  };

  render() {
    return (
      <div>
        <Navbar />
        <Homepage />
      </div>
    );
  }
}
