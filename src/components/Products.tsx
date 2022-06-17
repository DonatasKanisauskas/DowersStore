import '../styles/Products.sass';
import Product, { productType } from './Product';

let productList: productType[] = [
  {
    "title": "Dvaro suris",
    "price": 1.20,
    "desc": "Fermentinis DVARO sūris, 45% rieb",
  },
  {
    "title": "Svalia suris",
    "price": 0.94,
    "desc": "Produktai Puskietis fermentinis Svalia sūris, 50% rieb. s. m., 150 g",
  },
  {
    "title": "President Cheddar",
    "price": 1.12,
    "desc": "Sūris lydytas riekelėmis President Cheddar 18%, 200 g",
  },
  {
    "title": "Rokiskio suris",
    "price": 2.20,
    "desc": "Fermentinis ROKIŠKIO sūris, 45% rieb. s. m., 240 g",
  },
  {
    "title": "Rokiskio Gouda suris",
    "price": 0.85,
    "desc": " Sūris ROKIŠKIO GOUDA, 200 g",
  },
  {
    "title": "Germanto Gouda suris",
    "price": 1.25,
    "desc": "Sūris GERMANTO Gouda 45%, 240g",
  },
  {
    "title": "Gildija suris",
    "price": 0.99,
    "desc": "Pieno zvaigzdes - fermentinis suris",
  },
  {
    "title": "Naminis suris 45%",
    "price": 3.30,
    "desc": "Fermentinis sūris NAMINIS 240g, 45% rieb.s.m.",
  },
  {
    "title": "Dziugas Gourmet 1924",
    "price": 2.47,
    "desc": "Kietasis sūris DŽIUGAS® brandintas 36 mėn. Gourmet. Sūrio galva",
  },
];

function Products() {
  return (
    <>
      <h1>Products</h1>
      <div className="products_container">
        {/* FIXME: i is a bad example? */}
        {productList.map(({ title, price, desc }, i) => (
          <Product title={title} price={price} desc={desc} key={i} />
        ))}
      </div>
    </>
  );
}

export default Products;
