# Disable dates

If you try hovering with the mouse the dates that can’t be selected, you will see that it seems like you can select the date, while in fact you can’t:

![Screen Shot 2022-03-22 at 12.02.22.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f3ad5f80-d768-4636-b84e-d82fd9bc1953/Screen_Shot_2022-03-22_at_12.02.22.png)

Let’s fix this problem. `DayPicker` lets us add an array of dates we don’t want to let people select.

We must pass

1. the blocked dates in the configuration
2. the dates already booked
3. the dates in the past
4. the dates in the future more than 6 months from now

We start with the blocked dates.

We create a `getBlockedDates` function in `lib/dates.js`

```jsx
export const getBlockedDates = () => {
	const blocked = [];

	if (config.blocked) {
		for (const [year_key, year_value] of Object.entries(config.blocked)) {
			for (const [month_key, month_value] of Object.entries(year_value)) {
				for (const day of month_value) {
					blocked.push(new Date(year_key, month_key - 1, day));
				}
			}
		}
	}

	return blocked;
};
```

We import it in `pages/calendar.js`:

```jsx
import {
  isDaySelectable,
  getDatesBetweenDates,
  **getBlockedDates,**
} from 'lib/dates'
```

and we pass this array to the `disabled` prop:

```jsx
<DayPicker
	disabled={[...getBlockedDates()]}
	//....
/>
```

Next we create a `lib/bookings.js` file, and inside it a `getBookedDates()` function that has the job of retrieving the booked dates from the config:

```jsx
import config from 'lib/config';

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

We use this in the DayPicker:

```jsx
import { getBookedDates } from 'lib/bookings';

//...

<DayPicker
	disabled={[...getBlockedDates(), ...getBookedDates()]}
	//....
/>;
```

Finally we add the dates in the past and in the future, in this special way provided us by `DayPicker`:

```jsx
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)

const sixMonthsFromNow = new Date()
sixMonthsFromNow.setDate(sixMonthsFromNow.getDate() + 30 * 6)

//...

<DayPicker
  disabled={[
    ...getBlockedDates(),
    ...getBookedDates(),
		**{
	    from: new Date('0000'),
	    to: yesterday,
	  },
	  {
	    from: sixMonthsFromNow,
	    to: new Date('4000'),
	  },**
  ]}
  //....
/>
```

[8. Disable dates .mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d550b61a-c856-490e-b9e6-9de4cd55880b/8._Disable_dates_.mp4)

Next lesson: [Calculate the total amount of the stay](https://www.notion.so/Calculate-the-total-amount-of-the-stay-dc3beafcca364969916bd627b9aa5f5e)
