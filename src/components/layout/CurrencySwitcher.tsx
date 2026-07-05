"use client";

import type { Currency } from "../../types";

interface CurrencySwitcherProps {
	currency: Currency;
	setCurrency: (c: Currency) => void;
}

export function CurrencySwitcher({
	currency,
	setCurrency,
}: CurrencySwitcherProps) {
	return (
		<div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 gap-0.5">
			{(["PEN", "USD"] as Currency[]).map((c) => {
				const active = currency === c;
				return (
					<button
						key={c}
						onClick={() => setCurrency(c)}
						className={`px-2.5 py-1 rounded-md text-[10px] font-sans font-bold tracking-wider transition-all duration-300 border-0 cursor-pointer ${
							active
								? "bg-gold text-dark"
								: "bg-transparent text-white/50 hover:text-white"
						}`}
					>
						{c === "PEN" ? "S/." : "USD"}
					</button>
				);
			})}
		</div>
	);
}
