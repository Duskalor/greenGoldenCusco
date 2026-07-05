"use client";

import { getWhatsAppUrl } from "../../lib/whatsapp";
import { Animate } from "../ui/Animate";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

interface CTASectionProps {
	t: {
		cta: { label: string; title: string; desc: string; btn: string };
	};
	lang: string;
}

const ctaMessages: Record<string, string> = {
	es: "Hola, quiero diseñar mi itinerario",
	en: "Hi, I want to design my itinerary",
	pt: "Olá, quero montar meu roteiro",
};

const ctaTaglines: Record<string, string> = {
	es: "Sin compromiso · Respuesta inmediata · Precios directos",
	en: "No commitment · Instant response · Direct pricing",
	pt: "Sem compromisso · Resposta imediata · Preços diretos",
};

export function CTASection({ t, lang }: CTASectionProps) {
	const message = ctaMessages[lang] ?? ctaMessages.es;
	const tagline = ctaTaglines[lang] ?? ctaTaglines.es;
	return (
		<section className="py-24 px-6 bg-gradient-to-b from-dark to-dark-secondary relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-r from-gold/[0.03] via-gold/[0.06] to-gold/[0.03]" />
			<Container className="relative z-10 text-center">
				<Animate>
					<span className="text-[11px] font-sans text-gold tracking-[4px] uppercase">
						{t.cta.label}
					</span>
					<h2 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-white mt-3 mb-4">
						{t.cta.title}
					</h2>
					<p className="font-sans text-white/65 max-w-lg mx-auto mb-10 leading-relaxed">
						{t.cta.desc}
					</p>
					<Button
						variant="whatsapp"
						size="lg"
						as="a"
						href={getWhatsAppUrl(message)}
						target="_blank"
						rel="noreferrer"
					>
						💬 {t.cta.btn}
					</Button>
					<p className="font-sans text-xs text-white/45 mt-5">{tagline}</p>
				</Animate>
			</Container>
		</section>
	);
}
