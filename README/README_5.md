# Show the available dates in the calendar

Now that we have a calendar, we can disable the dates that we consider unselectable.

Unselectable dates are the ones that we currently define as blocked in the `lib/config.js` file, but also the dates already booked.

Also, dates in the past.

And we can’t let people book more than 6 months in advance, so any date that’s beyond 6 months from now is disabled

We can pass a `renderDay` prop to the component where we’ll customize how we render days that we can’t book:

```jsx
**<DayPicker
  components={{
    DayContent: (props) => (

    ),
  }}
/>**
```

```jsx
**import { isDaySelectable } from 'lib/dates'**

//...

<DayPicker
  components={{
    DayContent: (props) => (
      **<div className='relative text-right'>
        <div
          className={
            !isDaySelectable(props.date) && 'text-gray-500'
          }
        >
          {props.date.getDate()}
        </div>
      </div>**
    ),
  }}
/>
```

We create a `isDaySelectable` function in a new file, `lib/dates.js` which will host a few dates-specific functions:

```jsx
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

export const isDaySelectable = (day) => {
	return !isBlocked(day);
};
```

Right now a day is selectable if it’s not blocked, but we’ll add more cases very soon.

If the day is not selectable, we render it in gray. As you can see in this case March 20, 21 and 22 are blocked:

![Screen Shot 2022-03-22 at 10.52.26.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1757b1f3-fbcd-4d10-8f71-978033a72727/Screen_Shot_2022-03-22_at_10.52.26.png)

We also make booked dates unavailable:

```jsx
**export const isBooked = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  if (config.booked[year]) {
    if (config.booked[year][month]) {
      if (config.booked[year][month].findIndex((el) => el === day) !== -1) {
        return true
      }
    }
  }

  return false
}**

export const isDaySelectable = (day) => {
  return !isBlocked(day) **&& !isBooked(day)**
}
```

See, now more dates are shown in gray:

![Screen Shot 2022-03-22 at 11.04.32.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0286b769-6995-4238-ae66-4927d70308e8/Screen_Shot_2022-03-22_at_11.04.32.png)

We will also add past dates:

```jsx
**export const isPast = (date) => {
  const now = new Date()
  if (date.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0) >= 0) {
    return false
  }

  return true
}**

export const isDaySelectable = (day) => {
  return **!isPast(day) &&** !isBlocked(day) && !isBooked(day)
}
```

![Screen Shot 2022-03-22 at 11.07.24.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6916099d-6084-4176-b147-ed9e1af33f3b/Screen_Shot_2022-03-22_at_11.07.24.png)

We now must disable all dates after 6 months from now.

We add a function `calcNumberOfNightsBetweenDates` to calculate the number of days between two dates (see [https://flaviocopes.com/how-to-count-days-between-dates-javascript/](https://flaviocopes.com/how-to-count-days-between-dates-javascript/))

```jsx
export const calcNumberOfNightsBetweenDates = (startDate, endDate) => {
	const start = new Date(startDate); //clone
	const end = new Date(endDate); //clone
	let dayCount = 0;

	while (end > start) {
		dayCount++;
		start.setDate(start.getDate() + 1);
	}

	return dayCount;
};
```

and we use it in `isDaySelectable()`:

```jsx
export const isDaySelectable = (day) => {
  return (
    !isPast(day) &&
    !isBlocked(day) &&
    !isBooked(day) &&
    **calcNumberOfNightsBetweenDates(new Date(), day) <= 30 * 6**
  )
}
```

[5. Show the available dates in the calendar.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/521a54ca-be14-4f7e-a5de-921d058d3174/5._Show_the_available_dates_in_the_calendar.mp4)

Next lesson: [Show the pricing below available dates](https://www.notion.so/Show-the-pricing-below-available-dates-33ee00529d7c4f7baf9371917b4b0023)
