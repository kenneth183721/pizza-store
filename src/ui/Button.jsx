import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block rounded-full bg-yellow-400 font-semibold tracking-wide text-stone-800  transition-colors duration-300 hover:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 text-sm";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "inline-block rounded-full border-1 border-stone-500 font-medium tracking-wide text-stone-500 transition-colors duration-300 hover:bg-stone-400 hover:text-stone-800 focus:ring focus:ring-stone-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 px-4 py-2.5 md:px-6 md:py-3.5 text-sm",

    round:
      "border-1 text-xs border-stone-500 rounded-full px-2.5 py-1.5 hover:bg-stone-300 focus:ring focus:ring-stone-500 focus:ring-offset-2 transition-colors duration-300 md:px-2.5 md:py-1.5 text-sm",

    position: "text-blue-500 hover:text-blue-800 text-sm ",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <div>
        <button onClick={onClick} disabled={disabled} className={styles[type]}>
          {children}
        </button>
      </div>
    );

  return (
    <div>
      <button disabled={disabled} className={styles[type]}>
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;
