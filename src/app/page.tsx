"use client";

import { useRouter } from "next/navigation";
import { Commitments } from "@/components/sections/Commitments";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedTours } from "@/components/sections/FeaturedTours";
import { Hero } from "@/components/sections/Hero";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";

export default function HomePage() {
	const router = useRouter();
	const { lang, currency } = useApp();
	const t = translations[lang];

	return (
		<>
			<Hero t={t} onViewTours={() => router.push("/tours")} />
			<FeaturedTours tours={t.tours} t={t} currency={currency} />
			<Commitments t={t} lang={lang} />
			<CTASection t={t} lang={lang} />
		</>
	);
}
