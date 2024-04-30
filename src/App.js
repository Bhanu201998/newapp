import React, { Component } from 'react';
import Navbar from './Component/Navbar';
import News from './Component/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<News key="general" country="us" category="general" />} />
            <Route exact path='/Entertainment' element={<News key="Entertainment" country="us" category="Entertainment" />} />
            <Route exact  path='/Health' element={<News key="Health" country="us" category="Health" />} />
            <Route exact path='/Science' element={<News key="Science" country="us" category="Science" />} />
            <Route exact path='/Sports' element={<News key="Sports" country="us" category="Sports" />} />
            <Route exact path='/Technology' element={<News key="Technology" country="us" category="Technology" />} />
            <Route exact path='/Business' element={<News key="Business" country="us" category="TBusiness" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App;
