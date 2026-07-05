"use client";

import { cn } from "../../lib/utils";

interface CardProps {
	children: React.ReactNode;
	hover?: boolean;
	className?: string;
	onClick?: () => void;
}

export function Card({
	children,
	hover = false,
	className,
	onClick,
}: CardProps) {
	return (
		<div
			onClick={onClick}
			className={cn(
				"bg-dark-card/80 backdrop-blur-md border border-white/6 rounded-2xl transition-all duration-300",
				hover &&
					"cursor-pointer hover:border-gold/40 hover:bg-gold/[0.03] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]",
				className,
			)}
		>
			{children}
		</div>
	);
}
