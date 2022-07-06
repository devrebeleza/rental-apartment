import config from 'lib/config';

export const isBlocked = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	if (config.blocked[year]) {
		if (config.blocked[year][month]) {
			if (config.blocked[year][month].findIndex((el) => el === day) !== -1) {
				return true;
			}
		}
	}
	return false;
};

export const isBooked = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	if (config.booked[year]) {
		if (config.booked[year][month]) {
			if (config.booked[year][month].findIndex((el) => el === day) !== -1) {
				return true;
			}
		}
	}
	return false;
};

export const isPast = (date) => {
	const now = new Date();
	if (date.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0) >= 0) {
		return false;
	}
	return true;
};

const calcNumberofNightsBetweenDates = (startDate, endDate) => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	let dayCount = 0;

	while (end > start) {
		dayCount++;
		start.setDate(start.getDate() + 1);
	}
	return dayCount;
};

export const isDaySelectable = (day) => {
	return !isBlocked(day) && !isBooked(day) && !isPast(day) && calcNumberofNightsBetweenDates(new Date(), day) <= 30 * 6;
};

export const isWeekend = (date) => {
	return date.getDay() === 5 || date.getDay() === 6 ? true : false;
};

const getCustomPriceFromConfig = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();

	if (config.costs.custom[year]) {
		if (config.costs.custom[year][month]) {
			if (config.costs.custom[year][month][day]) {
				return config.costs.custom[year][month][day];
			}
			if (isWeekend(date) && config.costs.custom[year][month]['default_weekend']) {
				return config.costs.custom[year][month]['default_weekend'];
			}
			if (!isWeekend(date) && config.costs.custom[year][month]['default_weekday']) {
				return config.costs.custom[year][month]['default_weekday'];
			}
		}
	}
	return -1;
};

export function getCost(date) {
	let price = config.costs.default_weekday;

	if (isWeekend(date)) {
		price = config.costs.default_weekend;
	}

	const aPrice = getCustomPriceFromConfig(date);
	if (aPrice >= 0) {
		price = aPrice;
	}

	return price;
}
