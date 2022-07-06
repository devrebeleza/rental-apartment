# Let people pick the dates on the calendar

Now that we have the calendar in place showing the prices and the available dates for the bookings, we can let people pick a starting date and an ending date for their stay.

We’ll let people select a dates period, so we start by defining 2 state variables: `from` and `to`.

```jsx
import { useState } from 'react'

//...

export default function Calendar() {
  const [from, setFrom] = useState()
  const [to, setTo] = useState()

  //...
```

Next we modify `DayPicker` to take those values for the `selected` prop and we add a “range” mode prop:

```jsx
<DayPicker
  renderDay={/* ... */}
  **selected={[from, { from, to }]}
  mode="range"**
/>
```

Those are props specific to the DayPicker component, and I found them in the documentation on this page: [https://react-day-picker.js.org/basics/selecting-days](https://react-day-picker.js.org/basics/selecting-days)

This is the kind of thing you don’t come up on your own, but you figure out from the docs and the examples provided by libraries developers.

Finally, we pass a `handleDayClick` function we’ll define next to the `onDayClick` prop, which will be our callback event that’s called when the calendar detects a mouse click on a day:

```jsx
<DayPicker
  renderDay={/* ... */}
  selected={[from, { from, to }]}
  modifiers={{ start: from, end: to }}
  **onDayClick={handleDayClick}**
/>
```

Let’s define this function.

It’s important that it stays inside the component, so it has access to the `to` and `from` state variables we defined previously (we could pass them in the call as parameters, but it’s easier this way).

```jsx
export default function Calendar() {
	//...

	const handleDayClick = (day) => {};

	//...
}
```

This function initially is responsible for creating a range, which means a set of continuous dates.

```jsx
import { isDaySelectable**, addDayToRange** } from 'lib/dates'

const handleDayClick = (day) => {
  const range = addDayToRange(day, {
    from,
    to,
  })

  setFrom(range.from)
  setTo(range.to)
}
```

We define **`addDayToRange` in** `lib/dates.js` along with a helper function we need to make this work:

```elixir
**import { isSameDay } from 'date-fns'**

//...

const isDayBefore = (d1, d2) => {
  const day1 = new Date(d1).setHours(0, 0, 0, 0)
  const day2 = new Date(d2).setHours(0, 0, 0, 0)
  return day1 < day2
}

export const addDayToRange = (day, range = { from: null, to: null }) => {
  let { from, to } = range
  if (!from) {
    from = day
  } else if (from && to && isSameDay(from, to) && isSameDay(day, from)) {
    from = null
    to = null
  } else if (to && isDayBefore(day, from)) {
    from = day
  } else if (to && isSameDay(day, to)) {
    from = day
    to = day
  } else {
    to = day
    if (isDayBefore(to, from)) {
      to = from
      from = day
    }
  }

  return { from, to }
}
```

Then we add a few checks.

We want the initial date to be selectable, otherwise we show an alert box and we abort.

If the initial date is selectable but we don’t have a final date, we set the final date to the initial date, so when clicking a single day, we have it as the first and last day of the stay:

```jsx
const handleDayClick = (day) => {
  const range = addDayToRange(day, {
    from,
    to,
  })

  **if (!range.to) {
    if (!isDaySelectable(range.from)) {
      alert('This date cannot be selected')
      return
    }
    range.to = range.from
  }**

  setFrom(range.from)
  setTo(range.to)
}
```

If we have set a starting day, and we set a `to` day, we check if it’s selectable otherwise we abort:

```jsx
const handleDayClick = (day) => {
  const range = addDayToRange(day, {
    from,
    to,
  })

  if (!range.to) {
    if (!isDaySelectable(range.from)) {
      alert('This date cannot be selected')
      return
    }
    range.to = range.from
  }

  **if (range.to && range.from) {
    if (!isDaySelectable(range.to)) {
      alert('The end date cannot be selected')
      return
    }
  }**

  setFrom(range.from)
  setTo(range.to)
}
```

Finally, we must check that all days inside a range are selectable, otherwise we will abort the selection:

```jsx
const handleDayClick = (day) => {
  const range = addDayToRange(day, {
    from,
    to,
  })

  if (!range.to) {
    if (!isDaySelectable(range.from)) {
      alert('This date cannot be selected')
      return
    }
    range.to = range.from
  }

  if (range.to && range.from) {
    if (!isDaySelectable(range.to)) {
      alert('The end date cannot be selected')
      return
    }
  }

  **const daysInBetween = getDatesBetweenDates(range.from, range.to)

  for (const dayInBetween of daysInBetween) {
    if (!isDaySelectable(dayInBetween)) {
      alert('Some days between those 2 dates cannot be selected')
      return
    }
  }**

  setFrom(range.from)
  setTo(range.to)
}
```

We add `getDatesBetweenDates()` to `lib/dates.js`:

```jsx
export const getDatesBetweenDates = (startDate, endDate) => {
	let dates = [];
	//to avoid modifying the original date we clone it
	const theDate = new Date(startDate);
	theDate.setDate(theDate.getDate() + 1); //we exclude the first date
	while (theDate < endDate) {
		dates = [...dates, new Date(theDate)];
		theDate.setDate(theDate.getDate() + 1);
	}
	return dates;
};
```

and we import it in `pages/calendar.js` :

```jsx
import { isDaySelectable, addDayToRange, **getDatesBetweenDates** } from 'lib/dates'
```

Now try selecting dates. They will show up as blue:

![Screen Shot 2022-06-13 at 18.08.50.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ac9b06fc-bca0-46f2-bbc7-8e1924bcc7b0/Screen_Shot_2022-06-13_at_18.08.50.jpg)

And you’re prevented to select periods with unselectable days in between:

![Screen Shot 2022-06-13 at 18.09.09.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d5ca4e5d-f5da-4f87-b044-442122cf0d37/Screen_Shot_2022-06-13_at_18.09.09.jpg)

> NOTE: in the current version of the library, this alert was called 2 times. Not sure if it’s now resolved when you try this code, maybe yes. Otherwise it’s a better idea to print a message into the page instead of using `alert()`

We have a problem now. If you try selecting a day and you click it again, you’ll see this error:

![Screen Shot 2022-06-13 at 18.09.54.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5f0bc436-9d74-4016-b2cc-79b041227d5b/Screen_Shot_2022-06-13_at_18.09.54.jpg)

Add this line to `isDaySelectable` in `lib/dates.js` to prevent this problem:

```jsx
export const isDaySelectable = (day) => {
	if (!day) return true; //this means we're unselecting a day, return true to allow

	return !isPast(day) && !isBlocked(day) && !isBooked(day) && calcNumberOfNightsBetweenDates(new Date(), day) <= 30 * 6;
};
```

[7. Let people pick the dates on the calendar.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8e5aa2cd-a921-4073-9a38-75ea438a2a05/7._Let_people_pick_the_dates_on_the_calendar.mp4)

Next lesson: [Disable dates ](https://www.notion.so/Disable-dates-9576f2336e1c44ed8b57e7e0e743218f)
