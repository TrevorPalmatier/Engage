import * as React from 'react'
import styled from 'styled-components';

const NavbarScroller = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/viewstudies">Studies</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/CreateBlock">Blocks</a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="/About">About</a>
            </li>
          </ul>
    </div>
  </div>
</nav>
  )
}

export default NavbarScroller
