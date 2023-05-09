import * as React from "react";
import ProductPageUI from "@/components/product-page-ui";
import SEO from "@/components/seo";
import {
  convertTitleToSlug,
  getAllProducts,
  getProductBySlug,
  getCategories,
} from "@/utils/callback";

function ProductPage({ product, allproducts }) {
  const [linkImg, setLinkImg] = React.useState();
  React.useEffect(() => {
    const _img = allproducts
      .filter((pro) => pro.id === product.id)
      .map((item) => item.image);
    setLinkImg(_img);
  }, [product]);
  return (
    <React.Fragment>
      <SEO title={product.title} {...product} />
      <ProductPageUI product={product} linkImg={linkImg} />
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  const products = await getAllProducts();
  const paths = products.map((product) => {
    const slug = convertTitleToSlug(product.title);
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
  const products = await getAllProducts();
  const product = await getProductBySlug(slug, products);
  const categories = await getCategories();
  const pageProps = { categories: categories, allproducts: products };
  return { props: { ...pageProps, product } };
}

export default ProductPage;
