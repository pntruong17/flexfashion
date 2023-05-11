import * as React from "react";

const CartContext = React.createContext();

const CartContextProvider = ({ children }) => {
  const sumReducers = (numbers) => {
    const sum = numbers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    return sum;
  };

  const cartReducer = (state, action) => {
    switch (action.type) {
      case "INITIALIZE_CART":
        return {
          ...state,
          items: action.payload.items,
          totalItems: action.payload.totalItems,
          totalUniqueItems: action.payload.totalUniqueItems, //asdaw
          isEmpty: action.payload.isEmpty,
          // Cập nhật các thuộc tính khác của giỏ hàng (cartState) nếu cần thiết
        };
      case "CLEAR_ITEM":
        const clearItems = state.items.filter(
          (item) => item.productId !== action.payload.productId
        );

        const clear_totalItems = clearItems.reduce(
          (accumulator, currentItem) => {
            return accumulator + currentItem.quantity;
          },
          0
        );
        const clear_totalCost = clearItems.reduce(
          (accumulator, currentItem) => {
            return accumulator + currentItem.totalCost;
          },
          0
        );
        return {
          ...state,
          items: clearItems,
          totalItems: clear_totalItems,
          totalUniqueItems: clear_totalCost, //asdaw
          isEmpty: clearItems.length === 0 ? true : false,
          // Cập nhật các thuộc tính khác của giỏ hàng (cartState) nếu cần thiết
        };

      case "ADD_ITEM":
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingItem = state.items.find(
          (item) => item.productId === action.payload.productId
        );
        if (existingItem) {
          // Cập nhật thông tin của sản phẩm đã tồn tại
          const updatedItems = state.items.map((item) => {
            if (item.productId === action.payload.productId) {
              return {
                ...item,
                quantity: item.quantity + action.payload.quantity,
                totalCost: item.totalCost + action.payload.totalCost,
              };
            }
            return item;
          });

          const add_totalItems = updatedItems.reduce(
            (accumulator, currentItem) => {
              return accumulator + currentItem.quantity;
            },
            0
          );
          const add_totalCost = updatedItems.reduce(
            (accumulator, currentItem) => {
              return accumulator + currentItem.totalCost;
            },
            0
          );

          return {
            ...state,
            items: updatedItems,
            totalItems: add_totalItems,
            totalUniqueItems: add_totalCost, //asdaw
            isEmpty: false,

            // Cập nhật các thuộc tính khác của giỏ hàng (cartState) nếu cần thiết
          };
        } else {
          // Thêm sản phẩm mới vào giỏ hàng
          const newItem = {
            productId: action.payload.productId,
            name: action.payload.name,
            slug: action.payload.slug,
            image: action.payload.image,
            price: action.payload.price,
            quantity: action.payload.quantity,
            totalCost: action.payload.totalCost,
          };

          const add_totalItems = state.items.reduce(
            (accumulator, currentItem) => {
              return accumulator + currentItem.quantity;
            },
            0
          );
          const add_totalCost = state.items.reduce(
            (accumulator, currentItem) => {
              return accumulator + currentItem.totalCost;
            },
            0
          );
          return {
            ...state,
            items: [...state.items, newItem],
            totalItems: add_totalItems + action.payload.quantity,
            totalUniqueItems: add_totalCost + action.payload.totalCost, //asdaw
            isEmpty: false,
            // Cập nhật các thuộc tính khác của giỏ hàng (cartState) nếu cần thiết
          };
        }

      case "REMOVE_ITEM":
        let tempCost = 0;
        const updatedItems = state.items.map((item) => {
          if (item.productId === action.payload.productId) {
            tempCost = item.price;
            const updatedQuantity = item.quantity - action.payload.quantity;
            if (updatedQuantity <= 0) {
              // Xóa sản phẩm khỏi giỏ hàng nếu số lượng mới là 0 hoặc nhỏ hơn
              return null;
            } else {
              // Cập nhật số lượng và tổng giá sản phẩm

              return {
                ...item,
                quantity: updatedQuantity,
                totalCost: updatedQuantity * item.price,
              };
            }
          }
          return item;
        });

        // Lọc bỏ các sản phẩm có giá trị null (số lượng là 0 hoặc nhỏ hơn)
        const filteredItems = updatedItems.filter((item) => item !== null);

        const remove_totalItems = filteredItems.reduce(
          (accumulator, currentItem) => {
            return accumulator + currentItem.quantity;
          },
          0
        );
        const add_totalCost = filteredItems.reduce(
          (accumulator, currentItem) => {
            return accumulator + currentItem.totalCost;
          },
          0
        );

        return {
          ...state,
          items: filteredItems,
          isEmpty: filteredItems.length === 0 ? true : false,
          totalItems: remove_totalItems,
          totalUniqueItems: add_totalCost,

          // Cập nhật các thuộc tính khác của giỏ hàng (cartState) nếu cần thiết
        };

      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };

  const item = {
    productId: undefined,
    name: "",
    slug: "",
    image: "",
    price: null,
    quantity: null,
    totalCost: null, // nhân thành tiền
  };

  const [cartState, cartDispatch] = React.useReducer(cartReducer, {
    items: [],
    cartTotal: null,
    isEmpty: true,
    totalItems: 0, // tổng số lượng hàng trong giỏ
    totalUniqueItems: 0, // tổng thành tiền toàn giỏ
    saleOff: 0, // % giảm giá
    delivery: 15, // tiền shipping
  });

  const items = cartState.items;
  const totalItems = cartState.totalItems;
  const totalCost = cartState.totalUniqueItems;
  const deliveryCost = cartState.delivery;
  const isEmpty = cartState.isEmpty;

  const addItem = (product) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product.productId,
        name: product.name,
        slug: product.slug,
        image: product.image,
        price: product.price,
        quantity: product.quantity,
        totalCost: product.totalCost,
      },
    });
  };

  const removeItem = (productId) => {
    cartDispatch({
      type: "REMOVE_ITEM",
      payload: {
        productId: productId,
        quantity: 1, // Số lượng có thể điều chỉnh tùy theo yêu cầu
      },
    });
  };

  const clearItem = (productId) => {
    cartDispatch({
      type: "CLEAR_ITEM",
      payload: {
        productId: productId,
      },
    });
  };

  // Lấy trạng thái từ localStorage khi component khởi tạo
  React.useEffect(() => {
    const savedCartState = localStorage.getItem("cart_context_storage");
    if (savedCartState) {
      cartDispatch({
        type: "INITIALIZE_CART",
        payload: JSON.parse(savedCartState),
      });
    }
  }, []);

  React.useEffect(() => {
    console.log("cart", items);
    // Lưu trạng thái vào localStorage khi cartState thay đổi
    localStorage.setItem("cart_context_storage", JSON.stringify(cartState));
  }, [cartState]);

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        items,
        isEmpty,
        totalItems,
        totalCost,
        deliveryCost,
        addItem,
        removeItem,
        clearItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error("useLikeContext must be used within a LikeContextProvider");
  }

  return context;
};

export { CartContextProvider, useCartContext };
