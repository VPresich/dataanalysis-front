import clsx from "clsx";
import PropTypes from "prop-types";
import iconsPath from "../../../assets/img/icons.svg";
import css from "./IconButton.module.css";

/**
 * Universal button component for authentication actions (Log in / Log out / Sign in with Google).
 *
 * @param {string} iconName - The name of the SVG icon (from icons.svg)
 * @param {string} theme - Current theme ("light" or "dark")
 * @param {function} onClick - Function to execute when button is clicked
 * @param {ReactNode} children - Button text (e.g., "Log In", "Log Out")
 */
export default function IconButton({
  iconName,
  theme = "default",
  onClick,
  children,
}) {
  return (
    <button className={clsx(css.btn, css[theme])} onClick={onClick}>
      <span className={css.iconContainer}>
        <svg
          className={clsx(css.icon, css[theme])}
          width="20"
          height="20"
          aria-label={`${children} icon`}
        >
          <use href={`${iconsPath}#${iconName}`} />
        </svg>
      </span>
      <span className={css.txt}>{children}</span>
    </button>
  );
}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(["default", "green", "yellow", "blue", "red", "pink"]),
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
