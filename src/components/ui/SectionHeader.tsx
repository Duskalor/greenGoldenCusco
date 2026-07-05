import { Animate } from "./Animate";

interface SectionHeaderProps {
	label: string;
	title: string;
	subtitle?: string;
	center?: boolean;
}

export function SectionHeader({
	label,
	title,
	subtitle,
	center = true,
}: SectionHeaderProps) {
	return (
		<Animate className={center ? "text-center mb-14" : "mb-14"}>
			<span className="text-[11px] font-sans text-gold tracking-[4px] uppercase">
				{label}
			</span>
			<h2 className="font-display text-[clamp(28px,4vw,42px)] font-bold text-white mt-5 mb-0">
				{title}
			</h2>
			{subtitle && (
				<p className="font-sans text-white/50 mt-4 text-base max-w-xl mx-auto leading-relaxed">
					{subtitle}
				</p>
			)}
		</Animate>
	);
}
