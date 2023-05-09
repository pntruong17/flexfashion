import * as React from "react";
import { DefaultSeo } from "next-seo";

import { defaultSeo } from "next-seo.config";
import Footer from "@/components/footer";
import Header from "@/components/header";

function Layout({ children, footer, categories, allproducts }) {
  return (
    <React.Fragment>
      <DefaultSeo {...defaultSeo} />
      <Header categories={categories} allproducts={allproducts} />
      <div className="max-w-7xl mx-auto px-3 sm:px-5">{children}</div>
      <Footer {...footer} />
    </React.Fragment>
  );
}

export default Layout;
