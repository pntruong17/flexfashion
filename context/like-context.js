import * as React from "react";
import { getCookies, setCookies } from "@/utils/cookie";

const LikeContext = React.createContext();

function LikeContextProvider({ children }) {
  const [likes, setLikes] = React.useState([]);

  const removeFavorite = (id) => {
    const listLike = getCookies() || [];
    const newLike = listLike.filter((like) => like !== id);
    setCookies(newLike);
    setLikes(newLike);
  };

  const addFavorite = (id) => {
    const listLike = getCookies() || [];
    const newLike = [...listLike, id];
    setCookies(newLike);
    setLikes(newLike);
  };

  React.useEffect(() => {
    const listLike = getCookies() || [];
    setLikes(listLike);
  }, []);

  return (
    <LikeContext.Provider
      value={{
        likes,
        removeFavorite,
        addFavorite,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
}

const useLikeContext = () => {
  const context = React.useContext(LikeContext);

  if (!context) {
    throw new Error("useLikeContext must be used within a LikeContextProvider");
  }

  return context;
};

export { LikeContextProvider, useLikeContext };
