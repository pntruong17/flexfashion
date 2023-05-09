import { useRouter } from "next/router";
import Link from "next/link";

import { FacebookIcon, InstaIcon } from "@/icons";
import { Select } from "@/ui/form";
import { currencies, locales } from "hygraph.config";
import { useSettingsContext } from "@/context/settings";

const footerMenu = [
  {
    item: "Company",
    list: ["About us", "Press", "Trade", "Careers"],
  },
  {
    item: "Company",
    list: ["Brands", "Collections", "Lookbooks", "Price Promise"],
  },
  {
    item: "Delivery",
    list: [
      "Global Events Impact",
      "Delivery Information",
      "Refunds & Returns",
      "Furniture Delivery Guide",
    ],
  },
  {
    item: "Contact us",
    list: ["Call + 44 123 456 789", "Email Customer Care", "Visit Help Center"],
  },
];

function Footer({ categories = [], collections = [] }) {
  const router = useRouter();
  const { activeCurrency, switchCurrency } = useSettingsContext();

  const activeLocale = locales.find((locale) => locale.value === router.locale);

  const updateCurrency = (event) => {
    const currency = currencies.find(
      (currency) => currency.code === event.target.value
    );

    switchCurrency(currency);
  };

  const updateLocale = (event) => {
    const path = ["/cart"].includes(router.asPath) ? router.asPath : "/";

    router.push(path, path, { locale: event.target.value });
  };

  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="bg-[#1e1e1e] text-white" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="pb-8 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {footerMenu.map((menu) => (
            <div key={menu}>
              <h3 className="font-bold font-Outfit uppercase text-sm">
                {menu.item}
              </h3>
              <ul className="mt-6">
                {menu.list.map((menuItem) => (
                  <li
                    key={menuItem}
                    className="font-medium font-Montserrat mt-5 text-sm cursor-pointer hover:underline"
                  >
                    {menuItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 font-Outfit border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link
              href="https://www.facebook.com/flexrowdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Twitter</span>
              <FacebookIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link
              href="https://www.instagram.com/flexrowdev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">GitHub</span>
              <InstaIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; {currentYear} Flexrow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
