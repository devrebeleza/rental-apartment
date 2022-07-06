import config from 'lib/config';

export const getBookedDates = () => {
	const bookedDates = [];

	if (config.booked) {
		for (const [year_key, year_value] of Object.entries(config.booked)) {
			for (const [mont_key, month_value] of Object.entries(year_value)) {
				for (const day of month_value) {
					bookedDates.push(new Date(year_key, mont_key - 1, day));
				}
			}
		}
	}
	return bookedDates;
};
