/**
 * @jest-environment jsdom
 */
import "regenerator-runtime/runtime";
import { handleSubmit } from "../src/client/js/formHandler";

test("Testing the handleSubmit() function", () => {
    expect(handleSubmit).toBeDefined();
});
