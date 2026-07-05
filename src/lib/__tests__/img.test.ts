import { describe, it, expect, afterEach } from "vitest";
import { img } from "../img";

afterEach(() => {
	delete process.env.NEXT_PUBLIC_BASE_PATH;
});

describe("img()", () => {
	it("retorna la misma ruta si no hay basePath", () => {
		expect(img("/images/tours/cusco-hero.webp")).toBe(
			"/images/tours/cusco-hero.webp",
		);
	});

	it("prepend basePath cuando existe", () => {
		process.env.NEXT_PUBLIC_BASE_PATH = "/greenGoldenCusco";
		expect(img("/images/tours/cusco-hero.webp")).toBe(
			"/greenGoldenCusco/images/tours/cusco-hero.webp",
		);
	});

	it("no duplica basePath si la ruta ya lo tiene", () => {
		process.env.NEXT_PUBLIC_BASE_PATH = "/greenGoldenCusco";
		const result = img("/greenGoldenCusco/images/tours/cusco-hero.webp");
		expect(result).toBe("/greenGoldenCusco/images/tours/cusco-hero.webp");
	});

	it("no modifica rutas relativas", () => {
		process.env.NEXT_PUBLIC_BASE_PATH = "/greenGoldenCusco";
		expect(img("images/tours/cusco-hero.webp")).toBe(
			"images/tours/cusco-hero.webp",
		);
	});

	it("no modifica URLs absolutas", () => {
		process.env.NEXT_PUBLIC_BASE_PATH = "/greenGoldenCusco";
		expect(img("https://example.com/image.webp")).toBe(
			"https://example.com/image.webp",
		);
	});

	it("retorna string vacío si el src está vacío", () => {
		process.env.NEXT_PUBLIC_BASE_PATH = "/greenGoldenCusco";
		expect(img("")).toBe("");
	});
});
