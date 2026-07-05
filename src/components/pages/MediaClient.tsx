"use client";

import { useState } from "react";
import Image from "next/image";
import { Animate } from "@/components/ui/Animate";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";

export function MediaClient() {
	const { lang } = useApp();
	const t = translations[lang];
	const mp = t.mediaPage;
	const gallery = t.gallery ?? [];
	const [filter, setFilter] = useState("all");
	const categories: string[] = [
		"all",
		...(Array.from(
			new Set(gallery.map((g: any) => String(g.cat))),
		) as string[]),
	];
	const filtered =
		filter === "all" ? gallery : gallery.filter((g: any) => g.cat === filter);

	return (
		<div className="pt-24 bg-dark min-h-screen">
			<Container className="py-16">
				<SectionHeader label={mp.label} title={mp.title} subtitle={mp.desc} />
				<Animate delay={0.1}>
					<div className="flex justify-center gap-2 mb-10 flex-wrap">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => setFilter(cat)}
								className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all duration-300 border ${
									filter === cat
										? "bg-gold text-dark border-gold"
										: "bg-transparent text-white/50 border-white/12 hover:border-gold/30 hover:text-white"
								}`}
							>
								{cat === "all" ? mp.all : cat}
							</button>
						))}
					</div>
				</Animate>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{filtered.map((item: any, i: number) => (
						<Animate key={i} delay={i * 0.05}>
							<Card className="aspect-square relative overflow-hidden group cursor-pointer p-0">
								{item.src ? (
									<>
										<Image
											src={item.src}
											alt={item.title}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-700"
											sizes="(max-width: 768px) 50vw, 33vw"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
									</>
								) : (
									<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark to-dark-secondary">
										<div className="text-6xl">{item.emoji}</div>
									</div>
								)}
								<div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
									<div>
										<p className="font-sans font-semibold text-white text-sm">
											{item.title}
										</p>
										<p className="font-sans text-xs text-gold">{item.cat}</p>
									</div>
								</div>
							</Card>
						</Animate>
					))}
				</div>
				<Animate delay={0.2}>
					<Card className="mt-12 p-10 text-center">
						<h3 className="font-sans font-bold text-white mb-3">
							{mp.videoTitle}
						</h3>
						<p className="font-sans text-sm text-white/45">{mp.videoDesc}</p>
					</Card>
				</Animate>
			</Container>
		</div>
	);
}
