import React from "react";
import { getAllProducts, getCategories } from "@/utils/callback";
const ServerErrorPage = () => {
  return <h1>500 - Server Error</h1>;
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
export default ServerErrorPage;
