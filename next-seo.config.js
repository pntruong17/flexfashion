const description =
  "Build modern website, SEO ready commerce storefronts with Hygraph, Next.js, Stripe, and Vercel.";
const title = "Build Modern Commerce Experiences with a Headless CMS";
const url = "https://flexrow.com";

const seo = {
  title,
  titleTemplate: "%s | Flexrow dev",
  description,
  openGraph: {
    description,
    title,
    type: "website",
    url,
  },
  twitter: {
    handle: "@Flexrowdev",
    site: "@Flexrowdev",
  },
};

export { seo as defaultSeo, url as defaultUrl };
