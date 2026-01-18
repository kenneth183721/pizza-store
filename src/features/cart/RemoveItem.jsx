import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { removeItem } from "../cart/cartSlice";
import PropTypes from "prop-types";

function RemoveItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(removeItem(pizzaId))}>
      Remove
    </Button>
  );
}

RemoveItem.propTypes = {
  pizzaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default RemoveItem;
