import prisma from 'lib/prisma';
import config from 'lib/config';
import { getDatesBetweenDates } from 'lib/dates';

/* export const getBookedDates = () => {
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
 */

export const getBookedDates = async () => {
	const bookedDates = [];

	const bookings = await prisma.booking.findMany();

	for (const booking of bookings) {
		const dates = getDatesBetweenDates(booking.from, booking.to);

		bookedDates.push(booking.from);
		for (const bookedDay of dates) {
			bookedDates.push(bookedDay);
		}
	}
	return bookedDates;
};
