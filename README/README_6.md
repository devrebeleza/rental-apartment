# Show the pricing below available dates

Let’s now show the pricing for each available date in the calendar.

Right now we render each date in this way:

```jsx
<DayPicker
	components={{
		DayContent: (props) => <div className={`relative text-right ${!isDaySelectable(props.date) && 'text-gray-500'}`}>{props.date.getDate()}</div>,
	}}
/>
```

We can add another information, the pricing.

We start by making each date cost $20:

```jsx
<DayPicker
	components={{
		DayContent: (props) => (
			<div className={`relative text-right ${!isDaySelectable(props.date) && 'text-gray-500'}`}>
				**
				<div>
					**
					{props.date.getDate()}
					**
				</div>
				** **
				{isDaySelectable(props.date) && (
					<div>
						<span className={`bg-white text-black rounded-md font-bold px-1`}>$20</span>
					</div>
				)}
				**
			</div>
		),
	}}
/>
```

![Screen Shot 2022-03-22 at 11.13.12.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/465e11c6-6914-49e0-aae3-775f17ae8c56/Screen_Shot_2022-03-22_at_11.13.12.png)

Next we add a function to calculate the cost of each day based on the configuration we added in `lib/config.js`.

Create a `lib/cost.js` file and in there a `getCost` function:

```jsx
export function getCost(date) {}
```

First we get the default day price from the configuration:

```jsx
**import config from 'lib/config'**

export function getCost(date) {
	**let price = config.costs.default_weekday
	return price**
}
```

Then we change the price if it’s a weekend day:

```jsx
import config from 'lib/config'

**export const is_weekend = (date) => {
  return date.getDay() === 5 || date.getDay() === 6 ? true : false
}**

export function getCost(date) {
  let price = config.costs.default_weekday

  if (is_weekend(date)) {
    price = config.costs.default_weekend
  }

  return price
}
```

Next we take care of custom pricing for specific dates, or for months:

```jsx
**const get_custom_price_from_config = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  if (config.costs.custom[year]) {
    if (config.costs.custom[year][month]) {
      if (config.costs.custom[year][month][day]) {
        return config.costs.custom[year][month][day]
      }
      if (
        is_weekend(date) &&
        config.costs.custom[year][month]['default_weekend']
      ) {
        return config.costs.custom[year][month]['default_weekend']
      }
      if (
        !is_weekend(date) &&
        config.costs.custom[year][month]['default_weekday']
      ) {
        return config.costs.custom[year][month]['default_weekday']
      }
    }
  }

  return null
}**

export function getCost(date) {
  let price = config.costs.default_weekday

  if (is_weekend(date)) {
    price = config.costs.default_weekend
  }

  **if (get_custom_price_from_config(date)) {
    price = get_custom_price_from_config(date)
  }**

  return price
}
```

Finally we import `getCost` and we use it in `pages/calendar.js`:

```jsx
import { getCost } from 'lib/cost'

//...

<DayPicker
  components={{
    DayContent: (props) => (
      <div
        className={`relative text-right ${
          !isDaySelectable(props.date) && 'text-gray-500'
        }`}
      >
				<div>
	        {props.date.getDate()}
				</div>
				{isDaySelectable(props.date) && (
		      **<div className='-mt-2'>**
		        <span
		          className={`bg-white text-black rounded-md font-bold px-1 **text-xs**`}
		        >
		          ****$**{getCost(props.date)}**
		        </span>
		      </div>
		    )}
      </div>
    ),
  }}
/>
```

You will now see prices coming from the configuration:

![Screen Shot 2022-03-22 at 11.18.22.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e4c3d78-7a26-4056-bf6e-274112df5d14/Screen_Shot_2022-03-22_at_11.18.22.png)

![Screen Shot 2022-03-22 at 11.18.24.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0082b1ea-197a-483c-acb0-16e9978b7c66/Screen_Shot_2022-03-22_at_11.18.24.png)

[6. Show the pricing below available dates.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/02c3da68-cb23-4689-ad6e-a83d73bdc68b/6._Show_the_pricing_below_available_dates.mp4)

Next lesson: [Let people pick the dates on the calendar](https://www.notion.so/Let-people-pick-the-dates-on-the-calendar-9e47288836f747229c284523df9368ea)
