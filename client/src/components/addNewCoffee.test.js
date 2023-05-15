import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddNewCoffee from "./addNewCoffee";
import userEvent from "@testing-library/user-event";

describe("AddNewCoffee", () => {
    test("renders AddNewCoffee component and submits form", () => {
        // Mock functions
        const onSubmit = jest.fn((e) => e.preventDefault());
        const handleChange = jest.fn();
        const onClick = jest.fn();
        
        // Render AddNewCoffee component
        render(
            <AddNewCoffee
                onSubmit={onSubmit}
                coffeeData={{}}
                handleChange={handleChange}
                onClick={onClick}
                errorMessage=""
            />
        );

        // Find form elements
        const nameInput = screen.getByLabelText("Name:");
        const weightInput = screen.getByLabelText("Weight (grams):");
        const priceInput = screen.getByLabelText("Price (€):");
        const roastingLevelSelect = screen.getByLabelText("Roasting level:");
        const addButton = screen.getByText("Add");
        const cancelButton = screen.getByText("Cancel");

        // Simulate user input
        fireEvent.change(nameInput, { target: { value: "Test coffee" } });
        fireEvent.change(weightInput, { target: { value: 250 } });
        fireEvent.change(priceInput, { target: { value: 10 } });
        fireEvent.change(roastingLevelSelect, { target: { value: "1" } });

        // Simulate form submission
        userEvent.click(addButton);

        // Verify function calls
        expect(onSubmit.mock.calls).toHaveLength(1);
        expect(onSubmit).toHaveBeenCalledWith(expect.any(Object));

        // Verify input field values have been updated
        expect(handleChange).toHaveBeenCalledTimes(4);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object));

        // Verify cancel button click
        userEvent.click(cancelButton);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
