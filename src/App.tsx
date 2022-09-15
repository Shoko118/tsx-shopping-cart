import { useEffect } from "react";
import Cart from "./components/Cart";
import { useProductStore } from "./hooks/useProductStore";

const App = () => {
  const store = useProductStore();
  // data
  const { products, itemNumber, totalPrice, carts } = store;

  // functionality
  const { increaseQuantity, decreaseQuantity } = store;

  useEffect(() => {
    store.getProducts();
  }, [itemNumber, totalPrice]);

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

              <button onClick={() => store.addToCart(product)} className="bg-orange-300 px-2.5 py-1.5 rounded-md">
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
