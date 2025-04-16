import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import items from "../data/items";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <ShoppingList
        items={items}
        search={search}
        onSearchChange={setSearch}
      />
    </div>
  );
}

export default App;
