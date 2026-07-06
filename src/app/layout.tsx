import type { Metadata } from "next";
import "../styles/globals.css";
import { AppProviders } from "@/components/providers/AppProviders";

export const metadata: Metadata = {
	title: "Tours en Cusco | Green Golden Cusco",
	description:
		"Agencia de turismo local en Cusco. Machu Picchu, Montaña 7 Colores, trekkings y más.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="icon"
					type="image/svg+xml"
					href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`}
				/>
			</head>
			<body>
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
}
