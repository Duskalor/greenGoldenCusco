"use client";

import type { Lang } from "../../types";
import { FlagEN, FlagES, FlagPT } from "./Flags";

const flags: Record<Lang, React.FC> = { es: FlagES, en: FlagEN, pt: FlagPT };
const labels: Record<Lang, string> = {
	es: "Español",
	en: "English",
	pt: "Português",
};

interface LangSwitcherProps {
	lang: Lang;
	setLang: (l: Lang) => void;
}

export function LangSwitcher({ lang, setLang }: LangSwitcherProps) {
	return (
		<div className="flex gap-1.5 items-center">
			{(Object.keys(flags) as Lang[]).map((l) => {
				const Flag = flags[l];
				const active = lang === l;
				return (
					<button
						key={l}
						onClick={() => setLang(l)}
						title={labels[l]}
						className={`p-1 rounded-md border-2 transition-all duration-300 flex items-center justify-center ${
							active
								? "border-gold bg-gold/20 opacity-100 scale-110"
								: "border-white/12 bg-transparent opacity-60 hover:opacity-90"
						}`}
					>
						<Flag />
					</button>
				);
			})}
		</div>
	);
}
