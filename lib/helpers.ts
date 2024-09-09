export function formatDate(date: Date | string) {
	if (typeof date === 'string') date = new Date(date);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function extractYear(dateString: string): string {
	if (!dateString) return '';
	return dateString.split('-')[0];
}

export const animationValues = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
};

export function formatMinutes(minutes: number) {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	return `${hours}h ${remainingMinutes}m`;
}

export function shouldTextBeWhite(rgb: number[]) {
	const [r, g, b] = rgb;
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	return luminance > 0.6 ? true : false;
}
