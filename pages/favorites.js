import React, { useEffect, useState } from "react";
import { getAllProducts, getCategories } from "@/utils/callback";
import { getCookies } from "@/utils/cookie";
import SEO from "@/components/seo";
import ProductGrid from "@/components/product-grid";
import { useLikeContext } from "@/context/like-context";

const Favorites = ({ products }) => {
  const cookies = getCookies() || [];
  const [list, setList] = useState([]);
  useEffect(() => {
    const favoriteProducts = products.filter((product) =>
      cookies.includes(product.id)
    );
    setList(favoriteProducts);
  }, []);
  return (
    <React.Fragment>
      <SEO title={"Favorite Product"} />
      <ProductGrid products={list} header={"Favorite Products"} />
    </React.Fragment>
  );
};

export async function getStaticProps() {
  const categories = await getCategories();
  const allproducts = await getAllProducts();
  const pageProps = {
    categories: categories,
    products: allproducts,
    allproducts: allproducts,
  };
  return { props: { ...pageProps } };
}

export default Favorites;
