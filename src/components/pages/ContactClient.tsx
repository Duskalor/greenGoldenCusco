"use client";

import { useState } from "react";
import { Animate } from "@/components/ui/Animate";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function ContactClient() {
	const { lang } = useApp();
	const c = translations[lang].contact;
	const [sent, setSent] = useState(false);

	return (
		<div className="pt-24 bg-dark min-h-screen">
			<Container className="py-16">
				<SectionHeader label={c.label} title={c.title} subtitle={c.desc} />
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
					<Animate>
						<Card className="p-8">
							<h3 className="font-sans font-bold text-white mb-6">
								{c.formTitle}
							</h3>
							{sent ? (
								<div className="text-center py-8">
									<div className="text-5xl mb-4">✅</div>
									<p className="font-sans text-white/60">{c.sent}</p>
								</div>
							) : (
								<form
									onSubmit={(e) => {
										e.preventDefault();
										setSent(true);
									}}
									className="space-y-4"
								>
									{[
										{ name: "name", label: c.name, type: "text" },
										{ name: "email", label: c.email, type: "email" },
										{ name: "subject", label: c.subject, type: "text" },
									].map((f) => (
										<div key={f.name}>
											<label className="block font-sans text-xs text-white/50 mb-1.5 tracking-wider uppercase">
												{f.label}
											</label>
											<input
												type={f.type}
												required
												className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-white focus:outline-none focus:border-gold/50 transition-colors duration-300"
											/>
										</div>
									))}
									<div>
										<label className="block font-sans text-xs text-white/50 mb-1.5 tracking-wider uppercase">
											{c.message.replace("...", "")}
										</label>
										<textarea
											rows={4}
											required
											placeholder={c.message}
											className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-white focus:outline-none focus:border-gold/50 transition-colors duration-300 resize-none"
										/>
									</div>
									<Button
										type="submit"
										size="lg"
										className="w-full justify-center"
									>
										{c.send}
									</Button>
								</form>
							)}
						</Card>
					</Animate>
					<Animate delay={0.1}>
						<div className="space-y-5">
							<Card className="p-6">
								<h4 className="font-sans font-bold text-white text-sm mb-3">
									{c.whatsappTitle}
								</h4>
								<Button
									variant="whatsapp"
									as="a"
									href={getWhatsAppUrl("Hola, tengo una consulta")}
									target="_blank"
									rel="noreferrer"
									className="w-full justify-center"
								>
									+51 943 539 286
								</Button>
							</Card>
							<Card className="p-6 space-y-3">
								<div>
									<p className="font-sans text-xs text-gold tracking-[2px] uppercase mb-1">
										{c.emailTitle}
									</p>
									<p className="font-sans text-sm text-white/55">
										info@greengoldencusco.com
									</p>
								</div>
								<div>
									<p className="font-sans text-xs text-gold tracking-[2px] uppercase mb-1">
										{c.addressTitle}
									</p>
									<p className="font-sans text-sm text-white/55">Cusco, Perú</p>
								</div>
								<div>
									<p className="font-sans text-xs text-gold tracking-[2px] uppercase mb-1">
										{c.hoursTitle}
									</p>
									<p className="font-sans text-sm text-white/55">{c.hours1}</p>
									<p className="font-sans text-sm text-white/55">{c.hours2}</p>
								</div>
							</Card>
						</div>
					</Animate>
				</div>
			</Container>
		</div>
	);
}
