/**
 * Prepends the basePath to image src so they work on GitHub Pages.
 *
 * next/image with output:"export" doesn't prepend basePath automatically,
 * so we use native <img> tags with this helper instead.
 */
export function img(src: string): string {
	const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
	if (basePath && src.startsWith("/")) {
		return `${basePath}${src}`;
	}
	return src;
}
