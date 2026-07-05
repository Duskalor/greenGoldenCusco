"use client";

import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { img } from "@/lib/img";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/types";
import { Animate } from "@/components/ui/Animate";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface BlogCardProps {
	post: BlogPost;
	readMore: string;
	delay?: number;
}

export function BlogCard({ post, readMore, delay = 0 }: BlogCardProps) {
	const router = useRouter();
	return (
		<Animate delay={delay}>
			<Card
				hover
				className="p-0 h-full flex flex-col group overflow-hidden"
				onClick={() => router.push(`/blog/${post.slug}`)}
			>
				{/* Image header */}
				<div className="relative h-48 overflow-hidden">
				<img
					src={img(post.image)}
					alt={post.title}
					className="object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0 w-full h-full"
				/>
					<div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
					<div className="absolute top-3 left-3 z-10">
						<Badge variant="outline">{post.category}</Badge>
					</div>
				</div>

				{/* Content */}
				<div className="p-6 flex-1 flex flex-col">
					<div className="flex items-center gap-3 mb-3 text-[11px] font-sans text-white/45">
						<span className="flex items-center gap-1">
							<Calendar size={11} className="text-gold/60" />
							{post.date}
						</span>
						<span className="flex items-center gap-1">
							<Clock size={11} className="text-gold/60" />
							{post.readTime}
						</span>
						<span className="flex items-center gap-1">
							<User size={11} className="text-gold/60" />
							{post.author}
						</span>
					</div>

					<h3 className="font-display text-lg font-bold text-white mb-2.5 leading-snug">
						{post.title}
					</h3>
					<p className="font-sans text-sm text-white/55 leading-relaxed mb-5 flex-1 line-clamp-3">
						{post.excerpt}
					</p>

					<div className="flex items-center justify-between pt-4 border-t border-white/6">
						<Link
							href={`/blog/${post.slug}`}
							className="font-sans text-xs text-gold hover:text-gold-light transition-colors duration-300 no-underline font-semibold"
						>
							{readMore} →
						</Link>
						<div className="flex gap-1.5">
							{post.tags.slice(0, 2).map((tag) => (
								<span
									key={tag}
									className="text-[9px] font-sans text-white/30 bg-white/5 border border-white/8 rounded px-2 py-0.5"
								>
									#{tag}
								</span>
							))}
						</div>
					</div>
				</div>
			</Card>
		</Animate>
	);
}
