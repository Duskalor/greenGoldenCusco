import { getWhatsAppUrl } from "../../lib/whatsapp";
import { Animate } from "../ui/Animate";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";

interface CommitmentsProps {
	t: {
		commitments: {
			label: string;
			title: string;
			items: { icon: string; title: string; desc: string }[];
		};
		cta: { btn: string };
	};
	lang: string;
}

const commitmentMessages: Record<string, string> = {
	es: "Hola, quiero saber más sobre sus garantías y tours",
	en: "Hi, I want to learn more about your guarantees and tours",
	pt: "Olá, quero saber mais sobre suas garantias e tours",
};

export function Commitments({ t, lang }: CommitmentsProps) {
	const message = commitmentMessages[lang] ?? commitmentMessages.es;
	return (
		<section className="py-24 bg-gradient-to-b from-dark via-[#0e150a] to-dark px-6">
			<Container>
				<SectionHeader
					label={t.commitments.label}
					title={t.commitments.title}
				/>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
					{t.commitments.items.map((item, i) => (
						<Animate key={i} delay={i * 0.1}>
							<Card className="p-7 text-center h-full">
								<div className="text-4xl mb-4">{item.icon}</div>
								<h3 className="font-sans font-bold text-white text-base mb-2">
									{item.title}
								</h3>
								<p className="font-sans text-sm text-white/60 leading-relaxed">
									{item.desc}
								</p>
							</Card>
						</Animate>
					))}
				</div>
				<Animate delay={0.45}>
					<div className="text-center mt-12">
						<Button
							variant="whatsapp"
							size="lg"
							as="a"
							href={getWhatsAppUrl(message)}
							target="_blank"
							rel="noreferrer"
						>
							💬 {t.cta.btn}
						</Button>
					</div>
				</Animate>
			</Container>
		</section>
	);
}
