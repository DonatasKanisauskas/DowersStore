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

  const closeNavBar = () => {
    let ele: HTMLElement | null = document.querySelector("div.navbar_dropdown");
    if (ele) {
      ele.style.bottom = "";
    }
    ele = document.querySelector("a.navbar_button.categories_button");
    if (ele) {
      ele.style.backgroundColor = "";
      ele.innerText = "Categories ⇩";
    }
    ele = document.querySelector("div.categories_dropdown");
    if (ele) {
      ele.style.height = "";
    }

    setNavDropDown(false);
    setCategoriesDorpDown(false);
  }

  const handleNavDropDown = () => {
    if (navDropDown) {
      closeNavBar();
    }
    else {
      let ele: HTMLElement | null = document.querySelector("div.navbar_dropdown");
      if (ele) {
        ele.style.bottom = "-199px";
        setNavDropDown(true);
      }
    }
  }

  const handleCategoriesDropDown = () => {
    let ele: HTMLElement | null = document.querySelector("div.navbar_dropdown");
    if (ele) {
      ele.style.bottom = (categoriesDropDown) ? "-199px" : "-310px";
      setNavDropDown(true);
    }

    ele = document.querySelector("div.categories_dropdown");
    if (ele) {
      ele.style.height = (categoriesDropDown) ? "" : "111px";
    }

    ele = document.querySelector("a.navbar_button.categories_button");
    if (ele) {
      ele.style.backgroundColor = (categoriesDropDown) ? "" : "#111";
      ele.innerText = (categoriesDropDown) ? "Categories ⇩" : "Categories ⇪";
      setCategoriesDorpDown(!categoriesDropDown);
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
    closeNavBar();
    prevScrollpos = currentScrollPos;
  }

  useEffect(() => {
    fetchCategories();
  }, []);


  const filterCategories = () => {
    let input = (document.querySelector(".categories_input") as HTMLInputElement).value.toUpperCase();
    let a: NodeListOf<HTMLElement> = document.querySelectorAll(".categories_list a");

    Array.from(a).forEach(ele => {
      let text = ele?.textContent?.toUpperCase() || ele?.innerText?.toUpperCase();
      ele.style.display = (text.startsWith(input)) ? "" : "none";
    });
  }

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
              <input className="categories_input" type="text" placeholder="Search.." onChange={filterCategories}></input>
              <div className="categories_list">
                <a href="/products">All</a>
                {categories instanceof Array &&
                  categories.map((category, i) => (
                    <Link key={i} to={"/" + category + "/products"} onClick={closeNavBar}>{category}</Link>
                  ))
                }
              </div>
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
