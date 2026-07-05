"use client";

import { useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { Animate } from "@/components/ui/Animate";
import { Container } from "@/components/ui/Container";
import { useApp } from "@/context/AppContext";
import { blogData } from "@/data/blog";
import { translations } from "@/data/translations";

export function BlogListClient() {
	const { lang } = useApp();
	const t = translations[lang];
	const posts = blogData[lang];
	const bp = t.blogPage;
	const [filter, setFilter] = useState("all");

	const categories = [
		"all",
		...Array.from(new Set(posts.map((p) => p.categorySlug))),
	];
	const filtered =
		filter === "all"
			? posts
			: posts.filter((p) => p.categorySlug === filter);

	const catLabel = (slug: string) => {
		if (slug === "all") return bp.all;
		const p = posts.find((x) => x.categorySlug === slug);
		return p?.category ?? slug;
	};

	return (
		<div className="pt-24 pb-16 bg-dark min-h-screen">
			<Container>
				<Animate>
					<div className="text-center mb-12 pt-8">
						<span className="text-[11px] font-sans text-gold tracking-[4px] uppercase">
							{bp.label}
						</span>
						<h1 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-white mt-3 mb-3">
							{bp.title}
						</h1>
						<p className="font-sans text-white/50 max-w-lg mx-auto">
							{bp.desc}
						</p>
					</div>
				</Animate>
				<Animate delay={0.1}>
					<div className="flex justify-center gap-2 mb-12 flex-wrap">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => setFilter(cat)}
								className={`px-5 py-2 rounded-full text-sm font-sans font-semibold tracking-wide transition-all duration-300 border ${
									filter === cat
										? "bg-gold text-dark border-gold"
										: "bg-transparent text-white/60 border-white/15 hover:border-gold/40 hover:text-white"
								}`}
							>
								{catLabel(cat)}
							</button>
						))}
					</div>
				</Animate>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{filtered.map((post, i) => (
						<BlogCard
							key={post.slug}
							post={post}
							readMore={bp.readMore}
							delay={i * 0.06}
						/>
					))}
				</div>
			</Container>
		</div>
	);
}
