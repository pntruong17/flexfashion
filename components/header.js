import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { convertTitleToSlug, removeSpaces } from "@/utils/callback";
import {
  HeartIcon,
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  XSmallIcon,
} from "@/icons";
import { useLikeContext } from "@/context/like-context";
import Image from "next/image";

function Header({ categories, allproducts }) {
  const { cartTotal, totalItems } = useCart();
  const { likes } = useLikeContext();
  const [query, setQuery] = useState("");
  const [searchList, setSearchList] = useState(allproducts);
  const [openMenu, setOpenMenu] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    // Thực hiện hành động khác tại đây
  };
  const handleSearch = (e) => {
    e.preventDefault();
    //console.log(`Search for: ${query}`);
    // Do something with the search query
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    const productInSearch = allproducts.filter((p) =>
      removeSpaces(p.title.toLowerCase()).includes(
        removeSpaces(e.target.value.toLowerCase())
      )
    );
    setSearchList(productInSearch);
  };
  useEffect(() => {
    //console.log("like cóntext", likes);
  }, [likes]);
  return (
    <header className="sm:mx-10 flex-grow flex items-center justify-between px-4 sm:px-6">
      <div className="py-6 w-full">
        <nav className="flex items-center justify-between flex-col lg:flex-row space-x-4 relative">
          <div className="flex justify-between items-center w-full lg:w-auto">
            <div className="block lg:hidden w-24">
              <MenuIcon openMenu={openMenu} setOpenMenu={setOpenMenu} />
            </div>
            <Link href="/">
              <h3 className="text-3xl text-center lg:text-left md:text-5xl w-32 font-medium font-Baskerville tracking-tighter">
                flexfashion
              </h3>
            </Link>
            <div className="flex lg:hidden w-24">
              <Link href="/favorites" className="space-x-2 ml-1  relative">
                <HeartIcon aria-hidden="true" />
                {likes.length > 0 && (
                  <span className="absolute left-2 -top-1 w-4 h-4 rounded-full bg-black text-white text-[10px] flex justify-center font-semibold">
                    {likes.length}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="space-x-2 ml-5  relative">
                <ShoppingCartIcon aria-hidden="true" />
                {totalItems > 0 && (
                  <span className="absolute left-2 -top-1 w-4 h-4 rounded-full bg-black text-white text-[10px] flex justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
          {categories.length ? (
            <ul className="hidden lg:block">
              {categories.map((page) => (
                <li key={page} className="block md:inline-block md:my-0">
                  <Link
                    href={`/category/${convertTitleToSlug(page.toLowerCase())}`}
                    onClick={() => setOpenMenu(false)}
                    className="font-Montserrat tracking-wider text-[12px] hover:underline rounded-full py-2 px-3 uppercase"
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex flex-row w-full mt-2 lg:mt-0 lg:w-96 items-center font-Outfit relative">
            <div className="w-full lg:mr-5 flex-grow sm:w-auto">
              <form
                className="flex items-center justify-between border border-gray-500  text-sm px-3 py-1 lg:py-2"
                onSubmit={handleSearch}
              >
                <input
                  className="flex-grow font-Montserrat tracking-wider focus:outline-none"
                  type="text"
                  value={query}
                  placeholder="Search"
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                />
                <button className="" type="submit">
                  <SearchIcon aria-hidden="true" />
                </button>
              </form>
            </div>
            <Link
              href="/favorites"
              className="space-x-2 ml-1 hidden lg:block relative"
            >
              <HeartIcon aria-hidden="true" />
              {likes.length > 0 && (
                <span className="absolute left-2 -top-1 w-4 h-4 rounded-full bg-black text-white text-[10px] flex justify-center font-semibold">
                  {likes.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="space-x-2 ml-5 hidden lg:block relative"
            >
              <ShoppingCartIcon aria-hidden="true" />
              {totalItems > 0 && (
                <span className="absolute left-2 -top-1 w-4 h-4 rounded-full bg-black text-white text-[10px] flex justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>
            {openMenu ? (
              <>
                <ul className="absolute top-10 z-50 bg-white w-full p-5 shadow flex flex-col lg:hidden">
                  {categories.map((page) => (
                    <li key={page} className="block md:inline-block my-2">
                      <Link
                        onClick={() => setOpenMenu(false)}
                        href={`/category/${convertTitleToSlug(
                          page.toLowerCase()
                        )}`}
                        className="font-Montserrat tracking-wider text-[12px] hover:underline rounded-full py-2 px-3 uppercase"
                      >
                        {page}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
          {isFocused ? (
            <>
              <div className="absolute top-20 z-50 bg-white w-full p-2 sm:p-5 shadow">
                <h5 className="ml-3 mb-5 font-Outfit">Recommended for you:</h5>
                <div className="absolute w-10 h-10 top-2 right-2">
                  <XSmallIcon onClick={() => setIsFocused(false)} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 sm:px-10 gap-2 md:gap-8">
                  {searchList.map((product) => (
                    <Link
                      href={`/product/${convertTitleToSlug(product.title)}`}
                      key={product.id}
                      className=""
                      onClick={() => setIsFocused(false)}
                    >
                      <div className="w-full h-[180px] relative">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-Outfit text-lg font-light uppercase">
                        {product.category}
                      </h3>
                      <h3 className="font-Outfit font-semibold text-md">
                        {product.title}
                      </h3>
                      <h3 className="font-Outfit text-md">${product.price}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

export default Header;
