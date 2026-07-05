import { describe, it, expect } from "vitest";
import { translations } from "../translations";

type PlainObj = Record<string, unknown>;

/** Retorna todas las keys de un objeto como dot-notation paths */
function flattenKeys(obj: PlainObj, prefix = ""): string[] {
	const keys: string[] = [];
	for (const key of Object.keys(obj)) {
		const path = prefix ? `${prefix}.${key}` : key;
		if (
			typeof obj[key] === "object" &&
			obj[key] !== null &&
			!Array.isArray(obj[key])
		) {
			keys.push(...flattenKeys(obj[key] as PlainObj, path));
		} else {
			keys.push(path);
		}
	}
	return keys;
}

describe("translations", () => {
	const langs = ["es", "en", "pt"] as const;

	it("tiene los 3 idiomas", () => {
		expect(Object.keys(translations).sort()).toEqual(["en", "es", "pt"]);
	});

	it("tiene todas las keys de es en en", () => {
		const esKeys = flattenKeys(translations.es);
		const enKeys = new Set(flattenKeys(translations.en));
		const missing = esKeys.filter((k) => !enKeys.has(k));
		expect(missing, `Keys que faltan en 'en': ${missing.join(", ")}`).toEqual(
			[],
		);
	});

	it("tiene todas las keys de es en pt", () => {
		const esKeys = flattenKeys(translations.es);
		const ptKeys = new Set(flattenKeys(translations.pt));
		const missing = esKeys.filter((k) => !ptKeys.has(k));
		expect(missing, `Keys que faltan en 'pt': ${missing.join(", ")}`).toEqual(
			[],
		);
	});

	it("no tiene keys extra en en que no estén en es", () => {
		const esKeys = new Set(flattenKeys(translations.es));
		const enKeys = flattenKeys(translations.en);
		const extra = enKeys.filter((k) => !esKeys.has(k));
		expect(extra, `Keys extra en 'en': ${extra.join(", ")}`).toEqual([]);
	});

	it("no tiene keys extra en pt que no estén en es", () => {
		const esKeys = new Set(flattenKeys(translations.es));
		const ptKeys = flattenKeys(translations.pt);
		const extra = ptKeys.filter((k) => !esKeys.has(k));
		expect(extra, `Keys extra en 'pt': ${extra.join(", ")}`).toEqual([]);
	});

	it("todos los arrays tienen la misma longitud entre idiomas", () => {
		const es = translations.es as PlainObj;
		const en = translations.en as PlainObj;
		const pt = translations.pt as PlainObj;

		function checkArrayLengths(
			obj: PlainObj,
			other1: PlainObj,
			other2: PlainObj,
			prefix = "",
		) {
			for (const key of Object.keys(obj)) {
				const path = prefix ? `${prefix}.${key}` : key;
				const val = obj[key];
				if (Array.isArray(val)) {
					expect(
						(other1[key] as unknown[]).length,
						`${path} tiene distinta longitud en otro idioma`,
					).toBe(val.length);
					expect(
						(other2[key] as unknown[]).length,
						`${path} tiene distinta longitud en otro idioma`,
					).toBe(val.length);
				} else if (
					typeof val === "object" &&
					val !== null &&
					!Array.isArray(val)
				) {
					checkArrayLengths(
						val as PlainObj,
						other1[key] as PlainObj,
						other2[key] as PlainObj,
						path,
					);
				}
			}
		}

		checkArrayLengths(es, en, pt);
	});

	it("tiene contenido en cada key (no strings vacíos)", () => {
		function checkNotEmpty(obj: PlainObj, prefix = "") {
			for (const key of Object.keys(obj)) {
				const path = prefix ? `${prefix}.${key}` : key;
				const val = obj[key];
				if (typeof val === "string") {
					expect(
						val.length,
						`${path} está vacío en 'es'`,
					).toBeGreaterThan(0);
				} else if (
					typeof val === "object" &&
					val !== null &&
					!Array.isArray(val)
				) {
					checkNotEmpty(val as PlainObj, path);
				}
			}
		}
		checkNotEmpty(translations.es);
	});
});
