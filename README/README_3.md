# Defining the data we need in a config file

Now that we’ve finished the homepage and we have a nice looking presentation, it’s time to think about the reservations calendar.

We need a way to store data.

Let’s define all the data we’ll need in a config file.

Create a `lib/config.js` file:

```jsx
export default {};
```

Inside the exported object, we add a `costs` object that defines the cost of stays:

```jsx
export default {
	costs: {
		default_weekday: 30, //default week day price
		default_weekend: 50, //for Friday and Saturday nights
	},
};
```

We can define custom pricing too, so that in some months pricing changes, for example during summer months.

And we can also set a custom price for a specific date.

We can store this information in this way:

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
};
```

Next we can block days, for example if we want to reserve some dates for our friends, we can have a `blocked` object:

```jsx
export default {
	costs: {
		//...
	},
	blocked: {
		2022: {
			3: [20, 21, 22], //block these days in March
		},
	},
};
```

We’ll later store reservations in the database, but for now let’s just store them in a `booked` object similar to `blocked`:

```jsx
export default {
	costs: {
		//...
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

[3. Defining the data we need in a config file.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b71cbd24-68d9-450f-ae15-9d7cf8a1896e/3._Defining_the_data_we_need_in_a_config_file.mp4)

Next lesson: [Create a calendar page](https://www.notion.so/Create-a-calendar-page-2535731ec80c45d4a809606790b991c2)
