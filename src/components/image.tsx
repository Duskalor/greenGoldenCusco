"use client";

import NextImage, { type ImageProps } from "next/image";

/**
 * Wrapper around next/image that prepends basePath to src.
 *
 * next/image with output:"export" + unoptimized ignores basePath,
 * so images 404 on GitHub Pages. This component fixes that.
 */
export default function Image({ src, ...props }: ImageProps) {
	const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
	const resolved =
		typeof src === "string" && src.startsWith("/") && basePath
			? (`${basePath}${src}` as ImageProps["src"])
			: src;

	return <NextImage src={resolved} {...props} />;
}
