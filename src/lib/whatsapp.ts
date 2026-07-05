const PHONE = "51943539286";

export function getWhatsAppUrl(message: string): string {
	return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

export function getTourWhatsAppUrl(tourName: string, lang: string): string {
	const messages: Record<string, string> = {
		es: `Hola, quiero reservar el tour: ${tourName}`,
		en: `Hi, I want to book the tour: ${tourName}`,
		pt: `Olá, quero reservar o tour: ${tourName}`,
	};
	return getWhatsAppUrl(messages[lang] ?? messages.es);
}
