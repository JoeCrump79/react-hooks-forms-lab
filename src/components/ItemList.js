import React from "react";
import Item from "./Item";  // Import the Item component

function ItemList({ items }) {
  return (
    <ul className="Items">
      {items.map((item) => (
        <Item 
          key={item.id} 
          name={item.name} 
          category={item.category} 
        />
      ))}
    </ul>
  );
}

export default ItemList;
