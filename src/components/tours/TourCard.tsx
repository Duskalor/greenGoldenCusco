"use client";

import { Clock, Mountain, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { tourImages, tourMeta, tourPricesUSD } from "../../data/tours";
import type { Currency, Tour } from "../../types";
import { Animate } from "../ui/Animate";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

interface TourCardProps {
	tour: Tour;
	from: string;
	details: string;
	perPerson: string;
	currency?: Currency;
	delay?: number;
}

export function TourCard({
	tour,
	from,
	details,
	perPerson,
	currency = "PEN",
	delay = 0,
}: TourCardProps) {
	const router = useRouter();
	const meta = tourMeta[tour.id] ?? {
		emoji: "🏔️",
		gradient: "from-dark to-dark-secondary",
	};
	const displayPrice =
		currency === "USD" ? (tourPricesUSD[tour.id] ?? tour.price) : tour.price;

	return (
		<Animate delay={delay}>
			<Card
				hover
				onClick={() => router.push(`/tours/${tour.id}`)}
				className="p-0 h-full flex flex-col group overflow-hidden"
			>
				{/* Image header */}
				<div className="relative h-48 overflow-hidden">
					<Image
						src={
							tourImages[tour.id]?.hero ??
							"/images/tours/machu-picchu-hero.jpg"
						}
						alt={tour.name}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-700"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
					<div className="absolute top-3 right-3 z-10">
						<Badge variant="gold">{tour.duration}</Badge>
					</div>
				</div>

				{/* Content */}
				<div className="p-7 flex-1 flex flex-col">
					<span className="text-[10px] font-sans text-white/45 tracking-[2px] uppercase">
						{tour.tag}
					</span>
					<h3 className="font-display text-xl font-bold text-white mt-1.5 mb-2.5">
						{tour.name}
					</h3>
					<p className="font-sans text-sm text-white/65 leading-relaxed mb-5 flex-1">
						{tour.description}
					</p>

					<div className="flex items-center gap-4 mb-5 text-[11px] font-sans text-white/50">
						<span className="flex items-center gap-1">
							<Mountain size={12} className="text-gold/60" />
							{tour.altitude}
						</span>
						<span className="flex items-center gap-1">
							<Users size={12} className="text-gold/60" />
							{tour.groupSize}
						</span>
						<span className="flex items-center gap-1">
							<Clock size={12} className="text-gold/60" />
							{tour.difficulty}
						</span>
					</div>

					<div className="flex justify-between items-center border-t border-white/6 pt-5">
						<div>
							<span className="font-sans text-[17px] font-bold text-gold">
								{from} {displayPrice}
							</span>
							<p className="font-sans text-[10px] text-white/45 mt-0.5">
								{perPerson}
							</p>
						</div>
						<span className="text-xs font-sans text-white/50 group-hover:text-gold transition-colors duration-300">
							{details}
						</span>
					</div>
				</div>
			</Card>
		</Animate>
	);
}
