import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar_menu from './components/navbar_menu';

import './App.css';
import ViewPosts from './components/ViewPosts';

function App() {
  return (
    <div className="App">
      <Navbar_menu />
      <Container>
        <ViewPosts />
      </Container>
    </div>
  );
}

export default App;
