/**
 * @jest-environment jsdom
 */
import "regenerator-runtime/runtime";
import { addToList, itemRemoval } from "../src/client/js/toDoHandler";

test("Testing the updateUI() function", () => {
    expect(addToList).toBeDefined();
    expect(itemRemoval).toBeDefined();
});
