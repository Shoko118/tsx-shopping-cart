import type { ICart } from "../interface/interface";

interface Props {
  carts: ICart[];
  decreaseQuantity: (cart: ICart) => void;
  increaseQuantity: (cart: ICart) => void;
  totalPrice: () => number;
}

const Cart = (props: Props) => {
  const { carts } = props;

  const { decreaseQuantity, increaseQuantity, totalPrice } = props;
  return (
    <div>
      <h1>Cart</h1>

      {carts.length === 0 ? (
        <h1>Your Cart is Empty</h1>
      ) : (
        <div>
          {carts.map((cart: ICart) => (
            <div key={cart.id}>
              <img src={cart.image} alt={cart.title} className="w-28 h-28 rounded-md" />
              <h1>{cart.title}</h1>
              <p>{cart.price}</p>
              <h1>Quantity: {cart.quantity}</h1>

              <div>
                <button onClick={() => decreaseQuantity(cart)}>-</button>
                <button onClick={() => increaseQuantity(cart)}>+</button>
              </div>
            </div>
          ))}

          <div>
            <p>Total Price {totalPrice().toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
