import { describe, it, expect } from "vitest";
import { getWhatsAppUrl, getTourWhatsAppUrl } from "../whatsapp";

describe("getWhatsAppUrl()", () => {
	it("genera URL correcta con mensaje", () => {
		const url = getWhatsAppUrl("Hola, quiero info");
		expect(url).toContain("wa.me/51943539286");
		expect(url).toContain("text=");
	});

	it("encodea caracteres especiales en el mensaje", () => {
		const url = getWhatsAppUrl("¿Tour a Machu Picchu?");
		// Los espacios se convierten en %20
		expect(url).not.toContain("a Machu");
		expect(url).toContain("a%20Machu");
		// Los caracteres no-ASCII se encodean
		expect(url).toContain("%C2%BF"); // ¿ encodeado
		// El ? del mensaje se encodea (no confundir con ? del query string)
		expect(url).toContain("%3F");
	});

	it("URL empieza con https", () => {
		const url = getWhatsAppUrl("test");
		expect(url.startsWith("https://wa.me/")).toBe(true);
	});
});

describe("getTourWhatsAppUrl()", () => {
	it("genera mensaje en español por defecto", () => {
		const url = getTourWhatsAppUrl("Machu Picchu", "es");
		expect(url).toContain("reservar");
		expect(url).toContain("Machu%20Picchu");
	});

	it("genera mensaje en inglés", () => {
		const url = getTourWhatsAppUrl("Machu Picchu", "en");
		expect(url).toContain("book");
		expect(url).toContain("Machu%20Picchu");
	});

	it("genera mensaje en portugués", () => {
		const url = getTourWhatsAppUrl("Machu Picchu", "pt");
		expect(url).toContain("reservar");
		expect(url).toContain("Machu%20Picchu");
	});

	it("usa español como fallback si el idioma no existe", () => {
		const url = getTourWhatsAppUrl("Machu Picchu", "fr" as string);
		expect(url).toContain("reservar");
	});

	it("siempre usa el mismo número de teléfono", () => {
		const url = getTourWhatsAppUrl("Test", "en");
		expect(url).toContain("51943539286");
	});
});
