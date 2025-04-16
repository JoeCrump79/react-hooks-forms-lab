
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'; // needed for .toBeInTheDocument()
import ShoppingList from "../components/ShoppingList";

// Example data used in multiple tests
const testData = [
  { id: 1, name: "Yogurt", category: "Dairy" },
  { id: 2, name: "Lettuce", category: "Produce" },
  { id: 3, name: "Swiss Cheese", category: "Dairy" },
  { id: 4, name: "String Cheese", category: "Dairy" },
];

describe("ShoppingList search filtering", () => {
  test("the input field acts as a controlled input", () => {
    render(<ShoppingList items={testData} />);

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: "testing 123" } });

    expect(input.value).toBe("testing 123");
  });

  test("the shopping list filters based on the search term to include full matches", () => {
    render(<ShoppingList items={testData} />);

    // Before typing, all items should be visible
    expect(screen.queryByText("Yogurt")).toBeInTheDocument();
    expect(screen.queryByText("Lettuce")).toBeInTheDocument();

    // Filter by "Yogurt"
    fireEvent.change(screen.getByPlaceholderText(/Search/i), {
      target: { value: "Yogurt" },
    });

    expect(screen.queryByText("Yogurt")).toBeInTheDocument();
    expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();
  });

  test("the shopping list filters based on the search term to include partial matches", () => {
    render(<ShoppingList items={testData} />);

    // Type a partial match like "Cheese"
    fireEvent.change(screen.getByPlaceholderText(/Search/i), {
      target: { value: "Cheese" },
    });

    expect(screen.queryByText("Swiss Cheese")).toBeInTheDocument();
    expect(screen.queryByText("String Cheese")).toBeInTheDocument();
    expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();
    expect(screen.queryByText("Yogurt")).not.toBeInTheDocument();
  });
});
