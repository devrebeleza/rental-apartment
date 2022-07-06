# Calculate the total amount of the stay

Now after the user selects the days of their stay, I want to show the total amount they have to pay to reserve the house for the chosen days.

In `pages/calendar.js` we first add two state variables: `numberOfNights` and `totalCost`:

```jsx
//...

export default function Calendar() {
  const [numberOfNights, setNumberOfNights] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  //...
```

and if they have a value set, we show their value in the JSX, before the calendar:

```jsx
//...
export default function Calendar() {
	//...

  return (
    <div>
      //...
        <div className='flex flex-col mt-10'>
          <p className='text-2xl font-bold text-center my-10'>
            Availability and prices per night
          </p>
          **<p className='text-center'>
            {numberOfNights > 0 && `Stay for ${numberOfNights} nights`}
          </p>
          <p className='text-center mt-2'>
            {totalCost > 0 && `Total cost: $${totalCost}`}
          </p>**
          <div className='pt-6 flex justify-center availability-calendar'>
            <DayPicker ...
            //...
```

We set their value in the `handleDayClick()` function, at the end:

```jsx
const handleDayClick = (day) => {
  const range = DateUtils.addDayToRange(day, {
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

  const daysInBetween = getDatesBetweenDates(range.from, range.to)

  for (const dayInBetween of daysInBetween) {
    if (!isDaySelectable(dayInBetween)) {
      alert('Some days between those 2 dates cannot be selected')
      return
    }
  }

  setFrom(range.from)
  setTo(range.to)

  **setNumberOfNights(calcNumberOfNightsBetweenDates(range.from, range.to) + 1)
  setTotalCost(calcTotalCostOfStay(range.from, range.to))**
}
```

We use those 2 functions to calculate the value:

- `calcNumberOfNightsBetweenDates()`, which we already wrote in `lib/dates.js` and we just need to import it.
- `calcTotalCostOfStay()`, which we need to implement.

Let’s start with importing the first:

```jsx
import {
  isDaySelectable,
  getDatesBetweenDates,
  **calcNumberOfNightsBetweenDates,**
  getBlockedDates,
} from 'lib/dates'
```

Then we create a `calcTotalCostOfStay` function in `lib/cost.js`

```jsx
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
```

and we import it in the calendar page component:

```jsx
import { getCost**, calcTotalCostOfStay** } from 'lib/cost'
```

Try it! Selecting a range of dates will show the nights count, and the total cost:

![Screen Shot 2022-03-22 at 14.27.43.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/03ece4aa-dc81-4ac9-8032-aa46e81b92e8/Screen_Shot_2022-03-22_at_14.27.43.png)

> NOTE: I chose to highlight the nights, and not days. So even if customers depart on Apr 1 in this case, we only show March 31 as booked, and other customers can book the Apr 1 night.

We can also add a reset button underneath the cost, so a user can clear the selection:

```jsx
<p className='text-center'>
	{from && to && (
		<button
			className='border px-2 py-1 mt-4'
			onClick={() => {
				setFrom(null);
				setTo(null);
				setNumberOfNights(0);
				setTotalCost(0);
			}}>
			Reset
		</button>
	)}
</p>
```

![Screen Shot 2022-03-22 at 14.35.36.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7c2e8517-472a-4594-a7e6-651466c9449d/Screen_Shot_2022-03-22_at_14.35.36.png)

[9. Calculate the total amount of the stay.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c6df5cdc-0cf8-491c-8554-da71b0bdc082/9._Calculate_the_total_amount_of_the_stay.mp4)

Next lesson: [Create the data model to host bookings](https://www.notion.so/Create-the-data-model-to-host-bookings-a4688520d4c54c4a812169797372fcef)
