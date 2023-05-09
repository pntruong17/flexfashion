import Cookies from "universal-cookie";

const cookies = new Cookies();

const setCookies = (_dataArr) => {
  cookies.set("faverite_item_list", _dataArr, {
    path: "/",
    maxAge: 60 * 60 * 24,
  });
};
const getCookies = () => {
  const mycookies = cookies.get("faverite_item_list");
  return mycookies;
};
const checkCookies = (_data) => {
  const mycookies = cookies.get("faverite_item_list");
  if (mycookies.includes(_data)) {
    return true;
  } else {
    return false;
  }
};

export { setCookies, getCookies, checkCookies };
