import Cookies from "universal-cookie";

// const cookies = new Cookies();
// const secret = process.env.NEXT_PUBLIC_COOKIE_SECRET_KEY;

// const setCookies = (_cookieName, _data) => {
//   const token = jwt.sign({ data: _data }, secret, { expiresIn: "24h" });
//   cookies.set(_cookieName, token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== "development",
//     sameSite: "strict",
//     maxAge: 60 * 60 * 24,
//     path: "/",
//   });
// };

// const getCookies = (_cookieName) => {
//   const token = cookies.get(_cookieName);
//   try {
//     const decoded = verify(token, secret);
//     return decoded.data;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// };

// const updateCookies = (_cookieName, _data) => {
//   const myData = getCookies(_cookieName);
//   const newData = myData ? [...myData, _data] : [_data];
//   setCookies(_cookieName, newData);
// };

// const updateSingleNumberCookies = (_cookieName, _data) => {
//   const token = sign({ data: _data }, secret, { expiresIn: "1h" });
//   cookies.set(_cookieName, token, {
//     path: "/",
//     maxAge: 3600, // Thời gian sống của cookie tính bằng giây
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   });
// };

// const checkCookies = (_cookieName) => {
//   const myData = getCookies(_cookieName);
//   if (myData) {
//     return true;
//   } else {
//     return false;
//   }
// };

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
