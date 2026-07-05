import type { Metadata } from "next";
import { TourDetailClient } from "@/components/pages/TourDetailClient";
import { toursES } from "@/data/tours";

interface Props {
	params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
	return toursES.map((tour) => ({ id: tour.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const tour = toursES.find((t) => t.id === id);
	return {
		title: tour
			? `${tour.name} | Green Golden Cusco`
			: "Tour | Green Golden Cusco",
		description: tour?.description ?? "",
	};
}

export default async function TourDetailPage({ params }: Props) {
	const { id } = await params;
	return <TourDetailClient id={id} />;
}
