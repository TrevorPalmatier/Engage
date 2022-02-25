import * as React from 'react'
// import styled from 'styled-components';

import "./navbarScroller.scss"

const NavbarScroller = () => {
  return (
    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <nav className="NavbarScroller">

      <div className="left">
          <p>ENGAGE</p>
      </div>

      <div className="right">
        <li><a href="/">Home</a></li>
        <li><a className="nav-link active" href="/viewstudies">Studies</a></li>
        <li><a className="nav-link" href="/About">About</a></li>
      </div>
    </nav>
  )
}

export default NavbarScroller
