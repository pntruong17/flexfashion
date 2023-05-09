////////////////////////

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";

let x = 3;
export default function Test() {
  const movieList = [
    { id: 1, name: " this is 1st movie", tag: ["comedy", "short"] },
    { id: 2, name: " this is 2nd movie", tag: ["horror", "long"] },
    { id: 3, name: " this is 3th movie", tag: ["short", "long"] },
    { id: 4, name: " this is 4th movie", tag: ["horror", "long"] },
    { id: 5, name: " this is 1st movie", tag: ["comedy", "short"] },
    { id: 6, name: " this is 2nd movie", tag: ["horror", "long"] },
    { id: 7, name: " this is 3th movie", tag: ["short", "horror"] },
    { id: 8, name: " this is 4th movie", tag: ["horror", "long"] },
  ];
  const tags = ["comedy", "horror", "short", "long"];
  const [items, setItems] = useState(movieList);
  const [inTag, setInTag] = useState([]);

  function addTag(tag) {
    const _include = inTag.includes(tag);
    if (_include) return;
    setInTag((prev) => [...prev, tag]);
  }
  function removeTag(tag) {
    setInTag((prev) => prev.filter((t) => t !== tag));
  }

  useEffect(() => {
    const _newItems = [...movieList];
    if (inTag.length > 0) {
      const _item = _newItems.filter((movie) => {
        return inTag.every((tag) => movie.tag.includes(tag));
      });
      setItems(_item);
    } else {
      setItems(_newItems);
    }
  }, [inTag]);

  return (
    <div className="p-20">
      {tags.map((tag) => (
        <div key={tag} onClick={() => addTag(tag)}>
          {tag}
        </div>
      ))}
      <div className="flex">
        {inTag.map((tag) => (
          <div className="m-2" key={tag} onClick={() => removeTag(tag)}>
            {tag}
          </div>
        ))}
      </div>
      <div className="relative flex flex-wrap">
        <AnimatePresence>
          {items.map((item) => (
            <TR key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </div>
      {/* <ul className="mt-8 border rounded p-8 overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                opacity: { duration: 0.3 },
                height: { duration: 0.4 },
              }}
            >
              <div className="flex items-center justify-between py-2 border-b">
                <span>Item {item}</span>
                <button
                  onClick={() => removeItem(item)}
                  className="border rounded w-8 h-8"
                >
                  &times;
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="mt-8">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt,
          cum in laudantium atque est eligendi laboriosam assumenda, officia
          praesentium sunt temporibus. Facilis mollitia modi debitis consectetur
          eaque quia, explicabo aliquid!
        </p>
      </div> */}
    </div>
  );
}

function TR({ item, removeItem }) {
  let isPresent = useIsPresent();

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, duration: 0.5 }}
      exit={{
        opacity: 0,
        duration: 1,
      }}
      //transition={{ opacity: { duration: isPresent ? 0.5 : 1 } }}
      style={{
        position: isPresent ? "relative" : "absolute",
        alignItems: isPresent ? "" : "center",
      }}
      className="w-[180px] h-[180px] border rounded-lg bg-gray-100 m-2"
    >
      <h3 className="">
        {item.id} : {item.name}
      </h3>
    </motion.tr>
  );
}
