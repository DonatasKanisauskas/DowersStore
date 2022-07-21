import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [showHeader, setShowHeader] = useState(false);

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    prevScrollpos = currentScrollPos;
  }

  return (
    <div className="header flex" style={{ top: showHeader ? '-50px' : '0' }} >
      <Link className="navbar_button title inline noShrink" to="/">React Shop</Link>
      {/* button for phone dropdown menu */}
      <div className="flex grow space-between">
        <div className="inline">
          <Link className="navbar_button inline" to="#link1">Link1</Link>
          <Link className="navbar_button inline" to="#link2">Link2</Link>
          <Link className="navbar_button inline" to="#link3">Link3</Link>
        </div>
        <div className="inline">
          <Link className="navbar_button inline" to="#user">User</Link>
          <Link className="navbar_button inline" to="/cart">Cart</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
