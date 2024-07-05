import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  // /product/id is handled in product folder
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0]?product.images[0].url:""} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};
//The <span> tag is an inline HTML element used to group and style parts of text within a document without introducing any new block-level elements
export default ProductCard;