export default Loader = ({
  className = "",
  size = 11,
  strokeColor = "#25283D",
  strokeWidth = 1,
}) => {
  return (
    <div
      className={`Loader ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div
        style={{
          borderColor: `${strokeColor} transparent transparent transparent`,
          borderWidth: `${strokeWidth}px`,
        }}
      ></div>
      <div
        style={{
          borderColor: `${strokeColor} transparent transparent transparent`,
          borderWidth: `${strokeWidth}px`,
        }}
      ></div>
      <div
        style={{
          borderColor: `${strokeColor} transparent transparent transparent`,
          borderWidth: `${strokeWidth}px`,
        }}
      ></div>
      <div
        style={{
          borderColor: `${strokeColor} transparent transparent transparent`,
          borderWidth: `${strokeWidth}px`,
        }}
      ></div>
    </div>
  );
};
