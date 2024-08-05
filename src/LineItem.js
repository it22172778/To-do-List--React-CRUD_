import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";


const LineItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <li className="item" key={item.id}>
      <input
        type="checkbox"
        onChange={() => handleCheck(item.id)}
        checked={item.checked}
      />
      <label
        onDoubleClick={() => handleCheck(item.id)}
        style={{ textDecoration: item.checked ? 'line-through' : 'none' }}
      >
        {item.item}
      </label>
      <button onClick={() => handleDelete(item.id)}>Delete</button>
      <FaRegTrashAlt
        role="button"
        tabIndex="0"
        onClick={() => handleDelete(item.id)}
        aria-label={'Delete ' + item.item}
      />
    </li>
  );
};

export default LineItem