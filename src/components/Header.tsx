
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <ul className="navbar">
        <li><Link to="/">React Shop</Link></li>
        <li><Link to="#link1">Link1</Link></li>
        <li><Link to="#link2">Link2</Link></li>
        <li><Link to="#link3">Link3</Link></li>
        <li className="float-right"><Link to="#user">User</Link></li>
        <li className="float-right"><Link to="/cart">Cart</Link></li>
      </ul>
    </div>
  );
}

export default Header;
