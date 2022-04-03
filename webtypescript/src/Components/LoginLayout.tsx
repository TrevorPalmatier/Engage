import React from "react";
import NavbarScroller from "./NavbarScrollerLogin";
import "../App.scss";

export const Layout = ({ children }) => {
  return (
    <div>
      <NavbarScroller />
      <div className="page">{children}</div>
    </div>
  );
};
