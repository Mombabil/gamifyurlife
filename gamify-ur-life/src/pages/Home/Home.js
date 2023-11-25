import React from "react";
import Login from "./components/Login";
import Logged from "./components/Logged/Logged";
import { useSelector } from "react-redux";

const Home = () => {
  const token = useSelector((state) => state.user.authToken);

  return <>{token === "" || token === null ? <Login /> : <Logged />}</>;
};

export default Home;
