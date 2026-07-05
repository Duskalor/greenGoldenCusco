"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function ClientLayout({ children }: { children: React.ReactNode }) {
	const _pathname = usePathname();
	const { lang, setLang, currency, setCurrency } = useApp();
	const t = translations[lang];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="min-h-screen bg-dark text-white">
			<Navbar
				lang={lang}
				setLang={setLang}
				currency={currency}
				setCurrency={setCurrency}
				t={t}
			/>
			<main>{children}</main>
			<Footer t={t} />
			<WhatsAppFloat />
		</div>
	);
}
