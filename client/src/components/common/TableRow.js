import React from "react";
import PropTypes from "prop-types";

const TableRow = ({ votes, name, title, department, message, read }) => {
  return (
    <tr>
      <th scope="row">{votes}</th>
      <td>{name}</td>
      <td>{title}</td>
      <td>{department}</td>
      <td>{message}</td>
      <td>{read}</td>
    </tr>
  );
};

TableRow.propTypes = {
  votes: PropTypes.string,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  read: PropTypes.string
};

export default TableRow;
