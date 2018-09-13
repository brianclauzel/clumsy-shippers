import React from "react";

export default () => {
  var divStyle = {
    marginTop: "600px"
  };
  return (
    <footer
      className="bg-dark text-white mt-5 p-5 text-center"
      style={divStyle}
    >
      Copyright &copy; {new Date().getFullYear()} Clumsy Shipping
    </footer>
  );
};
