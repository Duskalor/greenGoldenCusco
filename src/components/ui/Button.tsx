import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "outline" | "ghost" | "whatsapp";
	size?: "sm" | "md" | "lg";
	as?: "button" | "a";
	href?: string;
	target?: string;
	rel?: string;
}

export function Button({
	variant = "primary",
	size = "md",
	className,
	children,
	as: Tag = "button",
	href,
	target,
	rel,
	...props
}: ButtonProps) {
	const base =
		"inline-flex items-center gap-2 font-sans font-bold tracking-widest uppercase transition-all duration-300 rounded-lg cursor-pointer border-0";

	const variants = {
		primary:
			"bg-gold text-dark hover:brightness-110 shadow-[0_4px_20px_rgba(166,141,73,0.25)] hover:-translate-y-1",
		outline:
			"bg-transparent text-white border border-white/15 hover:border-gold/40 hover:bg-gold/5 hover:-translate-y-1",
		ghost: "bg-transparent text-white/60 hover:text-white",
		whatsapp:
			"bg-[#25D366] text-white hover:bg-[#20bd5a] hover:-translate-y-1 shadow-[0_4px_20px_rgba(37,211,102,0.25)]",
	};

	const sizes = {
		sm: "text-[11px] px-5 py-2",
		md: "text-[12px] px-7 py-3",
		lg: "text-[14px] px-10 py-4",
	};

	const classes = cn(base, variants[variant], sizes[size], className);

	if (Tag === "a") {
		return (
			<a href={href} target={target} rel={rel} className={classes}>
				{children}
			</a>
		);
	}

	return (
		<button className={classes} {...props}>
			{children}
		</button>
	);
}
