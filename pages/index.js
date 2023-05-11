import ProductGrid from "@/components/product-grid";
import Hero from "@/components/hero";
import Subscribe from "@/components/subscribe";
import { getAllProducts, getCategories, getTop6 } from "@/utils/callback";

function IndexPage({ products }) {
  return (
    <>
      <Hero products={products} />
      <div className="w-32 border-b border-gray-500 mt-10 mb-6"></div>
      <ProductGrid products={products} header={"Top Products"} />
      <Subscribe />
    </>
  );
}

export const getStaticProps = async () => {
  const allProducts = await getAllProducts();
  const top6 = await getTop6();
  const categories = await getCategories();
  const pageProps = {
    categories: categories,
    products: top6,
    allproducts: allProducts,
  };
  return { props: { ...pageProps } };
};
export default IndexPage;
