import ProductGrid from "@/components/product-grid";
import Hero from "@/components/hero";
import Subscribe from "@/components/subscribe";
import { getAllProducts } from "@/utils/callback";

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

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const prod = await fetch("https://fakestoreapi.com/products?limit=6");
  const allProducts = await getAllProducts();
  const categories = await res.json();
  const products = await prod.json();
  const pageProps = {
    categories: categories,
    products: products,
    allproducts: allProducts,
  };
  return { props: { ...pageProps } };
}
export default IndexPage;
