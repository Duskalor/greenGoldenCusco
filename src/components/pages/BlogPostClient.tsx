"use client";

import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Animate } from "@/components/ui/Animate";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useApp } from "@/context/AppContext";
import { blogData } from "@/data/blog";
import { translations } from "@/data/translations";

export function BlogPostClient({ slug }: { slug: string }) {
	const router = useRouter();
	const { lang } = useApp();
	const t = translations[lang];
	const posts = blogData[lang];
	const post = posts.find((p) => p.slug === slug);

	if (!post) {
		return (
			<div className="min-h-screen bg-dark flex items-center justify-center">
				<div className="text-center">
					<p className="text-white/50 font-sans mb-4">
						{t.blogPage.notFound}
					</p>
					<Button onClick={() => router.push("/blog")}>
						← {t.blogPage.back}
					</Button>
				</div>
			</div>
		);
	}

	const related = posts
		.filter((p) => p.slug !== slug && p.categorySlug === post.categorySlug)
		.slice(0, 3);

	return (
		<div className="bg-dark min-h-screen">
			{/* Hero */}
			<div className="relative h-[45vh] min-h-[350px] overflow-hidden flex items-end">
				<Image
					src={post.image}
					alt={post.title}
					fill
					className="object-cover"
					priority
					sizes="100vw"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/20" />
				<Container className="relative z-10 pb-10 pt-24">
					<button
						onClick={() => router.push("/blog")}
						className="flex items-center gap-2 text-sm font-sans text-white/60 hover:text-gold transition-colors duration-300 mb-5 bg-transparent border-0 cursor-pointer"
					>
						<ArrowLeft size={16} />
						{t.blogPage.back}
					</button>
					<div className="flex items-center gap-2 flex-wrap mb-3">
						<Badge variant="outline">{post.category}</Badge>
						<Badge variant="dark">{post.readTime}</Badge>
					</div>
					<h1 className="font-display text-[clamp(26px,4.5vw,48px)] font-bold text-white max-w-3xl">
						{post.title}
					</h1>
				</Container>
			</div>

			{/* Content */}
			<Container className="py-12">
				<div className="max-w-3xl mx-auto">
					{/* Meta bar */}
					<Animate>
						<div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-white/8 text-sm font-sans text-white/45">
							<span className="flex items-center gap-1.5">
								<Calendar size={14} className="text-gold/60" />
								{post.date}
							</span>
							<span className="flex items-center gap-1.5">
								<Clock size={14} className="text-gold/60" />
								{post.readTime}
							</span>
							<span className="flex items-center gap-1.5">
								<User size={14} className="text-gold/60" />
								{post.author}
							</span>
							<div className="flex items-center gap-1.5">
								<Tag size={14} className="text-gold/60" />
								<div className="flex gap-1.5">
									{post.tags.map((tag) => (
										<span
											key={tag}
											className="text-[10px] bg-white/5 border border-white/10 rounded px-2 py-0.5"
										>
											#{tag}
										</span>
									))}
								</div>
							</div>
						</div>
					</Animate>

					{/* Article body */}
					<Animate delay={0.1}>
						<article className="prose prose-invert prose-gold max-w-none">
							{post.content.split("\n").map((line, i) => {
								if (line.startsWith("## ")) {
									return (
										<h2
											key={i}
											className="font-display text-2xl font-bold text-white mt-10 mb-4"
										>
											{line.slice(3)}
										</h2>
									);
								}
								if (line.startsWith("### ")) {
									return (
										<h3
											key={i}
											className="font-sans font-bold text-lg text-gold-light mt-8 mb-3"
										>
											{line.slice(4)}
										</h3>
									);
								}
								if (line.startsWith("**") && line.endsWith("**")) {
									return (
										<p
											key={i}
											className="font-sans font-semibold text-white/80 mt-4 mb-2"
										>
											{line.slice(2, -2)}
										</p>
									);
								}
								if (line.startsWith("- ")) {
									return (
										<li
											key={i}
											className="font-sans text-white/65 leading-relaxed ml-4 mb-1"
										>
											{line.slice(2)}
										</li>
									);
								}
								if (line.startsWith("| ")) {
									return null;
								}
								if (line.trim() === "") {
									return <div key={i} className="h-3" />;
								}
								return (
									<p
										key={i}
										className="font-sans text-white/65 leading-relaxed text-base mb-4"
									>
										{line}
									</p>
								);
							})}
						</article>
					</Animate>

					{/* Share / CTA */}
					<Animate delay={0.2}>
						<div className="mt-12 pt-8 border-t border-white/8 text-center">
							<p className="font-sans text-white/45 text-sm mb-4">
								{t.blogPage.cta}
							</p>
							<Button
								variant="whatsapp"
								as="a"
								href={`https://wa.me/51943539286?text=${encodeURIComponent(`¡Hola! Quiero información sobre ${post.title}`)}`}
								target="_blank"
								rel="noreferrer"
							>
								{t.blogPage.ctaBtn}
							</Button>
						</div>
					</Animate>

					{/* Related posts */}
					{related.length > 0 && (
						<Animate delay={0.3}>
							<h2 className="font-display text-2xl font-bold text-white mt-16 mb-6">
								{t.blogPage.related}
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
								{related.map((rp) => (
									<Link
										key={rp.slug}
										href={`/blog/${rp.slug}`}
										className="group block no-underline"
									>
										<div className="relative h-32 rounded-xl overflow-hidden mb-3">
											<Image
												src={rp.image}
												alt={rp.title}
												fill
												className="object-cover group-hover:scale-105 transition-transform duration-700"
												sizes="33vw"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
										</div>
										<h3 className="font-sans font-semibold text-sm text-white group-hover:text-gold transition-colors duration-300 leading-snug">
											{rp.title}
										</h3>
										<p className="font-sans text-xs text-white/40 mt-1">
											{rp.date} · {rp.readTime}
										</p>
									</Link>
								))}
							</div>
						</Animate>
					)}
				</div>
			</Container>
		</div>
	);
}
