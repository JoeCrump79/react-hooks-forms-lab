import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemForm from "../components/ItemForm";

test("adds a new item to the list when the form is submitted", () => {
  const onItemFormSubmit = jest.fn();

  render(<ItemForm onItemFormSubmit={onItemFormSubmit} />);

  fireEvent.change(screen.getByLabelText(/Name/i), {
    target: { value: "Ice Cream" },
  });

  fireEvent.change(screen.getByLabelText(/Category/i), {
    target: { value: "Dessert" },
  });

  fireEvent.submit(screen.getByTestId("item-form")); // 🔥 Fix is right here!

  expect(onItemFormSubmit).toHaveBeenCalledWith({
    name: "Ice Cream",
    category: "Dessert",
  });
});
