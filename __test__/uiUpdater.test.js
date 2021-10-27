/**
 * @jest-environment jsdom
 */
import "regenerator-runtime/runtime";
import { updateUI } from "../src/client/js/uiUpdater";

test("Testing the updateUI() function", () => {
    expect(updateUI).toBeDefined();
});
