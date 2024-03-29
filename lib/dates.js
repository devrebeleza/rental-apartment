import { isSameDay } from 'date-fns';
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

/* export const isBooked = (date) => {
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
}; */

const isBooked = (day, bookedDates) => {
	for (const bookedDate of bookedDates) {
		if (new Date(bookedDate).toDateString() == day.toDateString()) {
			return true;
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

export const calcNumberofNightsBetweenDates = (startDate, endDate) => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	let dayCount = 0;

	while (end > start) {
		dayCount++;
		start.setDate(start.getDate() + 1);
	}
	return dayCount;
};

export const isDaySelectable = (day, bookedDates) => {
	const monthsBefore = 6; // months before to disable dates, this is better if it is received for params
	if (!day) return true; // when we're unselecting a day

	return !isBlocked(day) && !isBooked(day, bookedDates) && !isPast(day) && calcNumberofNightsBetweenDates(new Date(), day) <= 30 * monthsBefore;
};

export const isWeekend = (date) => {
	if (!date) return null;
	return date.getDay() === 5 || date.getDay() === 6 ? true : false;
};

const getCustomPriceFromConfig = (date) => {
	if (!date) return -1;
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

const isDayBefore = (d1, d2) => {
	const day1 = new Date(d1).setHours(0, 0, 0, 0);
	const day2 = new Date(d2).setHours(0, 0, 0, 0);
	return day1 < day2;
};

export const addDayToRange = (day, range = { from: null, to: null }) => {
	let { from, to } = range;
	if (!from) {
		from = day;
	} else if (from && to && isSameDay(from, to) && isSameDay(day, from)) {
		from = null;
		to = null;
	} else if (to && isDayBefore(day, from)) {
		from = day;
	} else if (to && isSameDay(day, to)) {
		from = day;
		to = day;
	} else {
		to = day;

		if (isDayBefore(to, from)) {
			to = from;
			from = day;
		}
	}

	return { from, to };
};

export const getDatesBetweenDates = (startDate, endDate) => {
	let dates = [];

	const theDate = new Date(startDate); // clone the original date to avoid modifying
	theDate.setDate(theDate.getDate() + 1); // exclude the first date

	while (theDate <= endDate) {
		dates = [...dates, new Date(theDate)];
		theDate.setDate(theDate.getDate() + 1);
	}
	return dates;
};

export const getBlockedDates = () => {
	const blocked = [];

	if (config.blocked) {
		for (const [year_key, year_value] of Object.entries(config.blocked)) {
			for (const [mont_key, month_value] of Object.entries(year_value)) {
				for (const day of month_value) {
					blocked.push(new Date(year_key, mont_key - 1, day));
				}
			}
		}
	}
	return blocked;
};

export const yesterDay = () => {
	let yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	return yesterday;
};

export const monthsFromNow = (months) => {
	let someMonthsFromNow = new Date();
	someMonthsFromNow.setDate(someMonthsFromNow.getDate() + 30 * months);
	return someMonthsFromNow;
};

export const calcTotalCostOfStay = (startDate, endDate) => {
	let cost = 0;

	const theDate = new Date(startDate);

	cost += getCost(startDate);

	while (theDate < endDate) {
		theDate.setDate(theDate.getDate() + 1);
		cost += getCost(theDate);
	}

	return cost;
};
