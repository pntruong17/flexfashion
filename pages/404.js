import React from "react";
import { getAllProducts, getCategories } from "@/utils/callback";
const NotFoundPage = () => {
  return <h1>404 - Page Not Found</h1>;
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
export default NotFoundPage;
