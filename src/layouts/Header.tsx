import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [showHeader, setShowHeader] = useState(false);
  const [navDropDown, setNavDropDown] = useState(false);
  const [categoriesDropDown, setCategoriesDorpDown] = useState(false);
  const [categories, setCategories] = useState<Array<String>>();
  const [error, setError] = useState<any>(null);


  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/categories`
      );
      const data = await response.json();
      setCategories(data);
    }
    catch (err: any) {
      setError(err.message);
    }
  };

  const handleNavDropDown = () => {
    let ele: HTMLElement | null = document.querySelector("div.navbar_dropdown");
    if (ele) {
      ele.style.bottom = (navDropDown) ? "" : "-199px";
      setNavDropDown(!navDropDown);
      if (categoriesDropDown) {
        handleCategoriesDropDown();
      }
    }
  }

  const handleCategoriesDropDown = () => {
    let ele: HTMLElement | null = document.querySelector("a.navbar_button.categories_button");
    if (ele) {
      ele.style.backgroundColor = (categoriesDropDown) ? "" : "#111";
      ele.innerText = (categoriesDropDown) ? "Categories ⇩" : "Categories ⇪";
      setCategoriesDorpDown(!categoriesDropDown);
    }

    ele = document.querySelector("div.categories_dropdown");
    if (ele) {
      ele.style.maxHeight = (categoriesDropDown) ? "" : "111px";
    }

    ele = document.querySelector("div.navbar_dropdown");
    if (ele) {
      ele.style.bottom = (navDropDown) ? "-311px" : "-199px";
      setNavDropDown(!navDropDown);
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
    if (navDropDown) {
      handleNavDropDown();
    }
    if (categoriesDropDown) {
      handleCategoriesDropDown();
    }
    prevScrollpos = currentScrollPos;
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="head">
      <div className="navbar flex" style={{ top: showHeader ? '-50px' : '0' }} >
        <div className="navbar_mobile">
          <Link className="navbar_button title inline noShrink" to="/">React Shop</Link>
          <button className="navbar_button_dropdown" onClick={handleNavDropDown}>=</button>
        </div>
        <div className="navbar_dropdown flex grow space-between">
          <div className="navbar_dropdown_section inline">
            <a className="navbar_button categories_button inline" onClick={handleCategoriesDropDown}>Categories ⇩</a>
            <div className="categories_dropdown">
              <a href="/products">All</a>
              {categories instanceof Array &&
                categories.map((category, i) => (
                  <Link key={i} to={"/" + category + "/products"}>{category}</Link>
                ))
              }
            </div>
            <Link className="navbar_button inline" to="#link2">Link2</Link>
            <Link className="navbar_button inline" to="#link3">Link3</Link>
          </div>
          <div className="navbar_dropdown_section inline">
            <Link className="navbar_button inline" to="#user">User</Link>
            <Link className="navbar_button inline" to="/cart">Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
