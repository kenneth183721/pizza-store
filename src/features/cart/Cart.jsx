import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart } from "./cartSlice";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="divide-y divide-stone-200 border-b border-stone-200">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="mt-8 flex justify-end space-x-2">
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
        <Button to="/order/new" type="primary">
          Order Pizzas
        </Button>
      </div>
    </div>
  );
}

export default Cart;
