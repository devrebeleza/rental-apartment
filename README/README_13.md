# Show bookings from the database in the calendar

Now that we have real bookings, it’s time to show them in the calendar and prevent to book dates already booked to avoid problems with multiple bookings of the same dates!

First, we must get the bookings information from the server. We’ll call `getBookedDates()` in `getServerSideProps()` in `pages/calendar.js`:

```jsx
import prisma from 'lib/prisma';

//...

export async function getServerSideProps() {
	let bookedDates = await getBookedDates(prisma);
	bookedDates = JSON.parse(JSON.stringify(bookedDates));

	return {
		props: {
			bookedDates,
		},
	};
}
```

This function is defined in `lib/bookings.js` as this:

```jsx
export const getBookedDates = () => {
	const bookedDates = [];

	if (config.booked) {
		for (const [year_key, year_value] of Object.entries(config.booked)) {
			for (const [month_key, month_value] of Object.entries(year_value)) {
				for (const day of month_value) {
					bookedDates.push(new Date(year_key, month_key - 1, day));
				}
			}
		}
	}

	return bookedDates;
};
```

We rewrite it as this to get the data from the database:

```jsx
import { getDatesBetweenDates } from 'lib/dates';

export const getBookedDates = async (prisma) => {
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
```

Now we get the `bookedDates` prop in the component:

```jsx
export default function Calendar() {
export default function Calendar(**{ bookedDates }**) {
```

Now in the `lib/dates.js` file we use the `isBooked()` function to see if a date is booked in the config file:

```jsx
const isBooked = (date) => {
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
```

We rewrite it to:

```jsx
const isBooked = (day, bookedDates) => {
	for (const bookedDate of bookedDates) {
		if (new Date(bookedDate).toDateString() == day.toDateString()) {
			return true;
		}
	}

	return false;
};
```

Now back to `pages/calendar.js`.

Now we pass this array of dates to every call to the `isDaySelectable()` function defined in `lib/dates.js`:

```jsx
if (!isDaySelectable(range.from)) {
if (!isDaySelectable(range.from, **bookedDates**)) {

if (!isDaySelectable(range.to)) {
if (!isDaySelectable(range.to, **bookedDates**)) {

if (!isDaySelectable(dayInBetween)) {
if (!isDaySelectable(dayInBetween, **bookedDates**)) {

<div className={!isDaySelectable(day) && 'text-gray-500'}>
<div className={!isDaySelectable(day, **bookedDates**) && 'text-gray-500'}>

{isDaySelectable(day) && (
{isDaySelectable(day, **bookedDates**) && (
```

and instead of calling `...getBookedDates()` in `disabled` we use `...bookedDates`

Now in `isDaySelectable` in `lib/dates.js` we accept this `bookedDates` parameter and we pass it to `isBooked`:

```jsx
export const isDaySelectable = (day**, bookedDates**) => {
  if (!day) return true //this means we're unselecting a day, return true to allow

  return (
    !isPast(day) &&
    !isBlocked(day) &&
    !isBooked(day**, bookedDates**) &&
    calcNumberOfNightsBetweenDates(new Date(), day) <= 30 * 6
  )
}
```

Now you will see bookings from the database in the calendar, instead of the ones in the `lib/config.js` file. In that file you can remove the `booked` object. We’ll just store in there the pricing information and the blocked dates.

```jsx
export default {
	costs: {
		default_weekday: 30, //default week day price
		default_weekend: 50, //for Friday and Saturday nights

		custom: {
			2022: {
				3: {
					default_weekday: 70, //for the entire month of august, weekends are 70
					default_weekend: 170, //for the entire month of august, weekends are 70
					24: 100,
					25: 100,
				},
			},
		},
	},
	blocked: {
		2022: {
			3: [20, 21, 22], //block these days in March
		},
	},
	booked: {
		2022: {
			3: [17, 24, 25], //these days in March are reserved
		},
	},
};
```

[12. Show bookings from the database in the calendar.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b1616b2b-1fd8-4199-a934-073c491a07d9/12._Show_bookings_from_the_database_in_the_calendar.mp4)

We’re done with this week project!

Check the [expansion ideas](https://www.notion.so/BOOTCAMP-Week-14-c220257cf76046f19260549de8b59fe3)
