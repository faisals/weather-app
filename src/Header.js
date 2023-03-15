import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import styles from './Header.module.css';

function Header() {
  return (
    <Navbar expand="md" className={styles.header}>
      <Navbar.Brand href="/" className={styles.brand}>
        <img src="https://via.placeholder.com/200x50" alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/" className={styles.link}>Home</Nav.Link>
          <Nav.Link href="/" className={styles.link}>Products</Nav.Link>
          <Nav.Link href="/" className={styles.link}>About</Nav.Link>
          <Nav.Link href="/" className={styles.link}>Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
