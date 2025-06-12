// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Write from "./Pages/Write";
import Single from "./Pages/Single";
import BackgroundWrapper from "./Components/BackgroundWrapper";
import "./global.css";

function App() {
  return (
    <Router>
      <div className="App">
        <BackgroundWrapper>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/write" element={<Write />} />
              <Route path="/post/:id" element={<Single />} />
            </Routes>
          </main>
          <Footer />
        </BackgroundWrapper>
      </div>
    </Router>
  );
}

export default App;
