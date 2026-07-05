import type { Metadata } from "next";
import { BlogListClient } from "@/components/pages/BlogListClient";

export const metadata: Metadata = {
	title: "Blog | Green Golden Cusco",
	description:
		"Guías, consejos y experiencias sobre viajes a Cusco. Machu Picchu, Montaña 7 Colores, trekkings y más.",
};

export default function BlogPage() {
	return <BlogListClient />;
}
