import ProductCard from "@/components/product-card";
import { useEffect, useState } from "react";
import { convertTitleToSlug } from "@/utils/callback";
import { useLikeContext } from "@/context/like-context";

function ProductGrid({ products, header }) {
  const { likes } = useLikeContext();
  const [listProduct, setListProduct] = useState([]);
  const [sortDefault, setSortDefault] = useState(0);

  function sortByBestSelling(a, b) {
    return b.rating.count - a.rating.count;
  }

  function sortByRating(a, b) {
    return b.rating.rate - a.rating.rate;
  }

  function sortByName(a, b) {
    return a.title - b.title;
  }
  function sortByPriceIn(a, b) {
    return b.price - a.price;
  }

  function sortByPriceDe(a, b) {
    return a.price - b.price;
  }

  function setSortItems(_value) {
    setSortDefault(_value);
    switch (_value) {
      case "1": {
        const sortedProducts1 = [...listProduct].sort(sortByBestSelling);
        setListProduct(sortedProducts1);
        break;
      }
      case "2": {
        const sortedProducts2 = [...listProduct].sort(sortByRating);
        setListProduct(sortedProducts2);
        break;
      }
      case "3": {
        const sortedProducts3 = [...listProduct].sort(sortByName);
        setListProduct(sortedProducts3);
        break;
      }
      case "4": {
        const sortedProducts4 = [...listProduct].sort(sortByPriceDe);
        setListProduct(sortedProducts4);
        break;
      }
      case "5": {
        const sortedProducts5 = [...listProduct].sort(sortByPriceIn);
        setListProduct(sortedProducts5);
        break;
      }
      default:
        return _value;
    }
  }
  useEffect(() => {
    const newList = [...listProduct].map((product) => {
      let liked = false;
      if (likes.includes(product.id)) {
        liked = true;
      }
      return { ...product, liked: liked };
    });
    setListProduct(newList);
    setSortDefault(0);
  }, [likes]);
  useEffect(() => {
    const newList = [...products].map((product) => {
      let liked = false;
      if (likes.includes(product.id)) {
        liked = true;
      }
      return { ...product, liked: liked };
    });
    setListProduct(newList);
    setSortDefault(0);
  }, [products]);

  return (
    <>
      <div className="flex justify-between my-5">
        <h2 className="text-xl lg:text-2xl font-Montserrat font-bold capitalize">
          {header}
        </h2>
        <div>
          <select
            id="sort"
            className="border flex items-center border-gray-500 w-20 text-sm font-semibold py-2"
            onChange={(e) => {
              const temp = e.target.value;
              setSortItems(temp);
            }}
            value={sortDefault}
          >
            <option value="0" disabled="disabled">
              Sort
            </option>
            <option value="1">Best Selling</option>
            <option value="2">Rating</option>
            <option value="3">Name</option>
            <option value="4">
              Price {"("}Low to High{")"}
            </option>
            <option value="5">
              Price {"("}High to Low{")"}
            </option>
          </select>
        </div>
      </div>
      <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {listProduct.map(ProductCard)}
      </div>
    </>
  );
}

export default ProductGrid;
