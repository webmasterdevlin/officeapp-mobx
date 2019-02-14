import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/navBar.scss";

export interface Props {
  name: string;
}

const NavBar: React.FunctionComponent<Props> = ({ name }: any) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        OfficeApp React-Mobx
      </Link>
      <form className="form-inline">
        <span style={{ color: "lightblue", fontWeight: "bold" }}>
          Welcome, {name}!{" "}
        </span>
        <Link className="m-2 p-2 my-sm-0 links" to="/logout">
          <span style={{ color: "lightblue" }}>Logout</span>
        </Link>
      </form>
    </nav>
  );
};

export default NavBar;
