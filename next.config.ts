import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "greenGoldenCusco";

const nextConfig: NextConfig = {
	// Static export — genera HTML plano, funciona en cualquier host
	output: "export",

	// GitHub Pages no tiene Image Optimization de Next.js
	images: {
		unoptimized: true,
	},

	// Trailing slash para que /tours sirva /tours/index.html (GitHub Pages)
	trailingSlash: true,

	// En GitHub Pages se deploya en /repo-name/
	// Si usás dominio custom, cambiá basePath a "" y assetPrefix a ""
	basePath: isGitHubPages ? `/${repoName}` : "",
	assetPrefix: isGitHubPages ? `/${repoName}` : "",
};

export default nextConfig;
