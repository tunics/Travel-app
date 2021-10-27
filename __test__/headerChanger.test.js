/**
 * @jest-environment jsdom
 */
import "regenerator-runtime/runtime";
import { changeHeader } from "../src/client/js/headerChanger";

test("Testing the updateUI() function", () => {
    expect(changeHeader).toBeDefined();
});
