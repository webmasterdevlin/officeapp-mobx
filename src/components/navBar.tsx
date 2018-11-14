import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/navBar.scss";
import { inject, observer } from "mobx-react";
import departmentStore from "../stores/department.store";

// export interface NavBarProps {
//   departmentStore: typeof departmentStore;
// }

// class NavBar extends React.Component<NavBarProps, any> {
//   public render() {
//     return (
//       <nav className="navbar navbar-dark bg-dark">
//         <Link className="navbar-brand" to="/">
//           Office App
//         </Link>
//         <form className="form-inline">
//           <Link className="m-2 p-2 my-sm-0 links" to="/logout">
//             Logout
//           </Link>
//         </form>
//       </nav>
//     );
//   }
// }

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Office App
      </Link>
      <form className="form-inline">
        <Link className="m-2 p-2 my-sm-0 links" to="/logout">
          Logout
        </Link>
      </form>
    </nav>
  );
}

export default NavBar;
