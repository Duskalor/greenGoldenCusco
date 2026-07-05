import type { Metadata } from "next";
import { BlogPostClient } from "@/components/pages/BlogPostClient";
import { blogData } from "@/data/blog";

interface Props {
	params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
	const slugs = blogData.es.map((post) => ({ slug: post.slug }));
	return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = blogData.es.find((p) => p.slug === slug);
	return {
		title: post
			? `${post.title} | Green Golden Cusco`
			: "Blog | Green Golden Cusco",
		description: post?.excerpt ?? "",
	};
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params;
	return <BlogPostClient slug={slug} />;
}
