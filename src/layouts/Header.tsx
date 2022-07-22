import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [showHeader, setShowHeader] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleDropDown = () => {
    let ele: HTMLElement | null = document.querySelector("div .navbar_dropdown");
    if (ele) {
      ele.style.maxHeight = (dropDown) ? "0" : "500px";
      setDropDown(!dropDown);
    }
  }

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    if(dropDown){
      handleDropDown();
    }
    prevScrollpos = currentScrollPos;
  }

  return (
    <div className="navbar flex" style={{ top: showHeader ? '-50px' : '0' }} >
      <div className="navbar_mobile">
        <Link className="navbar_button title inline noShrink" to="/">React Shop</Link>
        <button className="navbar_button_dropdown" onClick={handleDropDown}>=</button>
      </div>
      <div className="navbar_dropdown flex grow space-between">
        <div className="navbar_dropdown_section inline">
          <Link className="navbar_button inline" to="#link1">Link1</Link>
          <Link className="navbar_button inline" to="#link2">Link2</Link>
          <Link className="navbar_button inline" to="#link3">Link3</Link>
        </div>
        <div className="navbar_dropdown_section inline">
          <Link className="navbar_button inline" to="#user">User</Link>
          <Link className="navbar_button inline" to="/cart">Cart</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
