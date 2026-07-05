"use client";

import {
	ArrowLeft,
	CheckCircle2,
	Clock,
	Mountain,
	Users,
	XCircle,
} from "lucide-react";
import Image from "@/components/image";
import { useRouter } from "next/navigation";
import { Animate } from "@/components/ui/Animate";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useApp } from "@/context/AppContext";
import { tourImages, tourMeta, tourPricesUSD } from "@/data/tours";
import { translations } from "@/data/translations";
import { getTourWhatsAppUrl } from "@/lib/whatsapp";
import type { Tour } from "@/types";

export function TourDetailClient({ id }: { id: string }) {
	const router = useRouter();
	const { lang, currency } = useApp();
	const t = translations[lang];
	const tours: Tour[] = t.tours ?? [];
	const tour = tours.find((x: Tour) => x.id === id);

	if (!tour)
		return (
			<div className="min-h-screen bg-dark flex items-center justify-center">
				<div className="text-center">
					<p className="text-white/50 font-sans mb-4">Tour no encontrado</p>
					<Button onClick={() => router.push("/tours")}>← Volver</Button>
				</div>
			</div>
		);

	const meta = tourMeta[tour.id] ?? {
		emoji: "🏔️",
		gradient: "from-dark to-dark-secondary",
	};
	const td = t.tourDetail;
	const waUrl = getTourWhatsAppUrl(tour.name, lang);
	const priceUSD = tourPricesUSD[tour.id];
	const primaryPrice =
		currency === "USD" ? (priceUSD ?? tour.price) : tour.price;
	const secondaryPrice = currency === "USD" ? tour.price : priceUSD;

	return (
		<>
			<div className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-end">
				{/* Hero background image */}
				<Image
					src={
						tourImages[tour.id]?.hero ??
						"/images/tours/machu-picchu-hero.webp"
					}
					alt={tour.name}
					fill
					className="object-cover"
					priority
					sizes="100vw"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/30" />
				<Container className="relative z-10 pb-10 pt-24">
					<button
						onClick={() => router.push("/tours")}
						className="flex items-center gap-2 text-sm font-sans text-white/60 hover:text-gold transition-colors duration-300 mb-5 bg-transparent border-0 cursor-pointer"
					>
						<ArrowLeft size={16} />
						{td.back}
					</button>
					<div className="flex items-start gap-3 flex-wrap mb-3">
						<Badge>{tour.tag}</Badge>
						<Badge variant="outline">{tour.duration}</Badge>
						<Badge variant="dark">{tour.difficulty}</Badge>
					</div>
					<h1 className="font-display text-[clamp(28px,5vw,52px)] font-bold text-white">
						{tour.name}
					</h1>
				</Container>
			</div>

			<div className="bg-dark min-h-screen">
				<Container className="py-12">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-10">
							<Animate>
								<div className="flex gap-6 flex-wrap">
									{[
										{
											icon: <Mountain size={16} className="text-gold" />,
											label: tour.altitude,
										},
										{
											icon: <Users size={16} className="text-gold" />,
											label: tour.groupSize,
										},
										{
											icon: <Clock size={16} className="text-gold" />,
											label: tour.duration,
										},
									].map((item, i) => (
										<div
											key={i}
											className="flex items-center gap-2 font-sans text-sm text-white/60"
										>
											{item.icon}
											{item.label}
										</div>
									))}
								</div>
							</Animate>
							<Animate delay={0.1}>
								<p className="font-sans text-white/60 leading-relaxed text-base">
									{tour.longDescription}
								</p>
							</Animate>
							<Animate delay={0.15}>
								<h2 className="font-sans font-bold text-gold text-sm tracking-[3px] uppercase mb-5">
									{td.itinerary}
								</h2>
								<div className="space-y-3">
									{tour.itinerary.map((item, i) => (
										<div key={i} className="flex gap-4 items-start">
											<span className="font-sans text-xs text-gold font-semibold min-w-[70px] mt-0.5">
												{item.time}
											</span>
											<div className="flex-1 pb-3 border-b border-white/5 font-sans text-sm text-white/55">
												{item.text}
											</div>
										</div>
									))}
								</div>
							</Animate>
							<Animate delay={0.2}>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div>
										<h3 className="font-sans font-bold text-sm tracking-[3px] uppercase text-green-400 mb-4">
											{td.includes}
										</h3>
										<ul className="space-y-2">
											{tour.includes.map((item, i) => (
												<li
													key={i}
													className="flex items-start gap-2 font-sans text-sm text-white/55"
												>
													<CheckCircle2
														size={14}
														className="text-green-400 mt-0.5 shrink-0"
													/>
													{item}
												</li>
											))}
										</ul>
									</div>
									<div>
										<h3 className="font-sans font-bold text-sm tracking-[3px] uppercase text-red-400 mb-4">
											{td.notIncludes}
										</h3>
										<ul className="space-y-2">
											{tour.notIncludes.map((item, i) => (
												<li
													key={i}
													className="flex items-start gap-2 font-sans text-sm text-white/55"
												>
													<XCircle
														size={14}
														className="text-red-400 mt-0.5 shrink-0"
													/>
													{item}
												</li>
											))}
										</ul>
									</div>
								</div>
							</Animate>
						</div>

						<div className="lg:col-span-1">
							<div className="sticky top-24 bg-dark-card border border-white/10 rounded-2xl p-6">
								<p className="font-sans text-xs text-white/40 tracking-[2px] uppercase mb-1">
									{td.priceLabel}
								</p>
								<p className="font-display text-4xl font-bold text-gold mb-1">
									{primaryPrice}
								</p>
								{secondaryPrice && (
									<p className="font-sans text-sm text-white/45 mb-1">
										≈ {secondaryPrice}
									</p>
								)}
								<p className="font-sans text-xs text-white/45 mb-6">
									{td.priceNote}
								</p>
								<Button
									variant="whatsapp"
									size="lg"
									className="w-full justify-center"
									as="a"
									href={waUrl}
									target="_blank"
									rel="noreferrer"
								>
									💬 {td.reserveBtn}
								</Button>
								<div className="mt-5 space-y-2">
									{td.trustSignals.map((item: string) => (
										<p
											key={item}
											className="font-sans text-xs text-white/50 flex items-center gap-2"
										>
											<span className="text-gold">✓</span>
											{item}
										</p>
									))}
								</div>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</>
	);
}
