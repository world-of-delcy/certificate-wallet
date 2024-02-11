function Icon({ name, className, regular = false }) {
  return (
    <i
      className={`icon fa-${
        regular ? "regular" : "solid"
      } fa-${name} ${className}`}
    ></i>
  );
}

export default Icon;
