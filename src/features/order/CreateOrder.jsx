import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import {
  getCart,
  getCurrentQuantityById,
  getTotalCartPrice,
} from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../users/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2">
          <label>First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required className="input grow" />
          </div>
          {formErrors?.phone && (
            <p className="rounded-md bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="relative mb-5 flex flex-col gap-2">
          <label>Address</label>
          <div>
            <input
              className="input w-full pr-24"
              type="text"
              defaultValue={address}
              name="address"
              key={address}
              disabled={isLoadingAddress}
              required
            />
            {addressStatus === "error" && (
              <p className="rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          <span className="absolute top-9 right-2 z-50 sm:top-10 sm:right-3">
            <Button
              disabled={isSubmitting || isLoadingAddress}
              type="position"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
              className="text-sm text-blue-600"
            >
              Get Position
            </Button>
          </span>
        </div>

        <div className="mb-12 flex items-center gap-4">
          <input
            className="h-6 w-6 accent-green-600 focus:ring focus:ring-green-600 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">
            Are you want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />

          <div className="flex items-center justify-end gap-4">
            <Button disabled={isSubmitting} type="primary">
              {isSubmitting
                ? "Placing order..."
                : `Order now from ${formatCurrency(totalPrice)}`}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const cart = JSON.parse(data.cart); // 解析購物車資料

  // ✅ 手動計算總價，這一步非常重要，因為 MockAPI 不會幫你算
  const orderPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const order = {
    ...data,
    cart,
    priority: data.priority === "on",
    // ✅ 將計算好的價錢存入資料庫
    orderPrice,
    estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString(),
  };

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
