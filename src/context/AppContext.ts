import { createContext, useContext } from "react";
import type { Currency, Lang } from "@/types";

interface AppContextValue {
	lang: Lang;
	setLang: (l: Lang) => void;
	currency: Currency;
	setCurrency: (c: Currency) => void;
}

export const AppContext = createContext<AppContextValue>({
	lang: "es",
	setLang: () => void 0,
	currency: "PEN",
	setCurrency: () => void 0,
});

export function useApp() {
	return useContext(AppContext);
}
