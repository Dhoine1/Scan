import React from "react";
import { Route, Routes} from "react-router-dom";
import Menu from "./components/header/Menu";
import Main from "./components/main/Main"
import Login from "./components/main/Login"
import Search from "./components/main/Search"
import Footer from "./components/footer/Footer";
import Result from "./components/main/Result";
import './app.css';

function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/search" element={<Search />} /> 
        <Route path="/results" element={<Result />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
