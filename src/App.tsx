import { useEffect, useState } from "react";
import axios from "axios";
import type { IProduct, ICart } from "./interface/Interface";
import Cart from "./components/Cart";

const App = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [carts, setCarts] = useState<ICart[]>([]);
  const [itemNumber, setItemNumber] = useState<number>(0);

  async function getProducts() {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      setProducts(response.data);
    } catch (error) {
      console.log("GET PRODUCTS ERROR", error);
    }
  }

  function addToCart(product: IProduct) {
    // e.preventDefault();
    // event: MouseEvent<HTMLButtonElement>

    const item = carts.find((item) => item.id === product.id);

    if (item) {
      const itemQuantity = item.quantity++;
      console.log("increase item quantity", itemQuantity);
      setItemNumber(itemQuantity);
    } else {
      const addNewItem = [...carts, { ...product, quantity: 1 }];
      console.log("pushing item", addNewItem);
      setCarts(addNewItem);
    }
  }

  function increaseQuantity(cart: ICart) {
    const item = carts.find((item) => item.id === cart.id);

    if (item) {
      const increaseQuantity = item.quantity++;
      console.log("increasing quantity", increaseQuantity);
      setItemNumber(increaseQuantity);
    } else {
      return item;
    }
  }

  function decreaseQuantity(cart: ICart) {
    const item: ICart | undefined = carts.find((item) => item.id === cart.id);

    console.log("here", item);

    if (item && item?.quantity > 1) {
      const decreaseQuantity = item.quantity--;
      console.log("decreasing quantity", decreaseQuantity);
      setItemNumber(decreaseQuantity);
    } else {
      const removeCart = carts.filter((item) => item.id !== cart.id);
      console.log("removing cart", removeCart);
      setCarts(removeCart);
    }
  }

  const totalPrice = () => {
    return carts.reduce((total, item) => {
      const number = total + item.price * item.quantity;
      console.log(number);
      return number;
    }, 0);
  };

  return (
    <div className="flex items-start">
      <div className="w-[50%]">
        <h1>Product</h1>

        <ul className="mt-7 grid grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id}>
              <img className="w-[90%] h-52 object-contain" src={product.image} alt={product.category} />
              <h1>{product.category}</h1>
              <h2>${product.price}</h2>

              <button onClick={() => addToCart(product)} className="bg-orange-300 px-2.5 py-1.5 rounded-md">
                Add
              </button>
            </div>
          ))}
        </ul>
      </div>

      <Cart
        totalPrice={totalPrice}
        carts={carts}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
    </div>
  );
};

export default App;
