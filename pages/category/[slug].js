import * as React from "react";
import {
  getAllProducts,
  getCategories,
  convertTitleToSlug,
  getProductsByCategory,
} from "@/utils/callback";
import ProductGrid from "@/components/product-grid";
import SEO from "@/components/seo";

function CategoryPage({ categories, products }) {
  return (
    <React.Fragment>
      <SEO title={products[0]?.category} {...categories} />
      <ProductGrid products={products} header={products[0]?.category} />
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories.map((product) => {
    const slug = convertTitleToSlug(product);
    return {
      params: { slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const allproducts = await getAllProducts();
  const productsbyCategory = await getProductsByCategory(slug, allproducts);
  const categories = await getCategories();
  const pageProps = {
    categories: categories,
    products: productsbyCategory,
    allproducts: allproducts,
  };
  return { props: { ...pageProps } };
}

export default CategoryPage;
