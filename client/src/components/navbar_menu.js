import React, { Component } from 'react';
import Navbar from "react-bootstrap/Navbar";
import { Nav,Form,Button,FormControl } from "react-bootstrap";

export default class Navbar_menu extends Component {
  constructor(props) {
      super(props);

  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        
      </>
    );
  }
}
