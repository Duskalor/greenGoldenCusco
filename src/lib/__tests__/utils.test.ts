import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn()", () => {
	it("une clases separadas por espacio", () => {
		expect(cn("foo", "bar")).toBe("foo bar");
	});

	it("filtra valores falsy", () => {
		expect(cn("foo", false, undefined, null, "bar")).toBe("foo bar");
	});

	it("retorna string vacío si todo es falsy", () => {
		expect(cn(false, undefined, null)).toBe("");
	});

	it("retorna string vacío sin argumentos", () => {
		expect(cn()).toBe("");
	});

	it("maneja un solo argumento", () => {
		expect(cn("solo")).toBe("solo");
	});
});
