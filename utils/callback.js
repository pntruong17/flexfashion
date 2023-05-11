export function convertTitleToSlug(title) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Thay thế các ký tự không phải chữ cái, số, khoảng trắng bằng dấu gạch ngang
    .replace(/^-+|-+$/g, ""); // Loại bỏ dấu gạch ngang ở đầu và cuối chuỗi (nếu có)
  return slug;
}

export async function getAllProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  // Trả về tất cả sản phẩm
  return products;
}

export async function getProductBySlug(slug, products) {
  // Tìm sản phẩm theo slug
  const product = products.find((p) => convertTitleToSlug(p.title) === slug);

  return product;
}

export async function getProductsByCategory(category, _products) {
  // Tìm sản phẩm theo slug
  const products = _products.filter(
    (p) => convertTitleToSlug(p.category) === category
  );

  return products;
}

export async function getCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  // Tìm sản phẩm theo slug
  const categories = await res.json();

  return categories;
}

export async function getTop6() {
  const res = await fetch("https://fakestoreapi.com/products?limit=6");
  // Tìm sản phẩm theo slug
  const top6 = await res.json();

  return top6;
}

export async function getProductId(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  // Tìm sản phẩm theo slug
  const product = await res.json();

  return product;
}

export function removeSpaces(str) {
  return str.replace(/\s+/g, "");
}
