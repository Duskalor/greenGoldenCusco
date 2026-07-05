"use client";

import Image from "next/image";
import { Animate } from "@/components/ui/Animate";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";

export function AboutClient() {
	const { lang } = useApp();
	const a = translations[lang].about;
	return (
		<div className="bg-dark min-h-screen">
			{/* Hero banner */}
			<div className="relative h-[35vh] min-h-[300px] overflow-hidden flex items-end">
				<Image
					src="/images/tours/cusco-hero.jpg"
					alt="Cusco"
					fill
					className="object-cover"
					priority
					sizes="100vw"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/30" />
				<Container className="relative z-10 pb-10">
					<h1 className="font-display text-[clamp(28px,5vw,48px)] font-bold text-white">
						{a.title}
					</h1>
					<p className="font-sans text-sm text-gold tracking-[3px] uppercase mt-2">
						{a.label}
					</p>
				</Container>
			</div>
			<Container className="py-16">
				<Animate delay={0.1}>
					<div className="max-w-3xl mx-auto space-y-5 mb-16">
						{a.paragraphs.map((p: string, i: number) => (
							<p
								key={i}
								className="font-sans text-white/55 leading-relaxed text-base"
							>
								{p}
							</p>
						))}
					</div>
				</Animate>
				<Animate delay={0.15}>
					<h2 className="font-sans font-bold text-gold text-sm tracking-[3px] uppercase text-center mb-8">
						{a.valuesTitle}
					</h2>
				</Animate>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
					{a.values.map((v: any, i: number) => (
						<Animate key={i} delay={i * 0.1}>
							<Card className="p-6 text-center">
								<div className="text-3xl mb-3">{v.icon}</div>
								<h3 className="font-sans font-bold text-white text-sm mb-2">
									{v.title}
								</h3>
								<p className="font-sans text-xs text-white/40 leading-relaxed">
									{v.desc}
								</p>
							</Card>
						</Animate>
					))}
				</div>
				<Animate>
					<h2 className="font-sans font-bold text-gold text-sm tracking-[3px] uppercase text-center mb-8">
						{a.teamTitle}
					</h2>
				</Animate>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
					{a.team.map((m: any, i: number) => (
						<Animate key={i} delay={i * 0.08}>
							<Card className="p-6 text-center">
								<div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-3xl mx-auto mb-4">
									{m.emoji}
								</div>
								<h3 className="font-sans font-bold text-white text-sm mb-1">
									{m.name}
								</h3>
								<p className="font-sans text-xs text-gold mb-1">{m.role}</p>
								<p className="font-sans text-xs text-white/35">{m.exp}</p>
							</Card>
						</Animate>
					))}
				</div>
				<Animate>
					<Card className="p-8 text-center">
						<h3 className="font-sans font-bold text-white mb-3">
							{a.legalTitle}
						</h3>
						<p className="font-sans text-sm text-white/45 max-w-2xl mx-auto mb-5">
							{a.legalDesc}
						</p>
						<div className="flex justify-center gap-3 flex-wrap">
							{a.legalBadges.map((b: string, i: number) => (
								<span
									key={i}
									className="font-sans text-xs text-gold bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5"
								>
									{b}
								</span>
							))}
						</div>
					</Card>
				</Animate>
			</Container>
		</div>
	);
}
