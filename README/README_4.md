# Create a calendar page

Now we can build the calendar page.

Create a `pages/calendar.js` file.

We start by replicating a structure similar to the homepage for the heading part of the page:

```jsx
import Head from 'next/head';
import Link from 'next/link';

export default function Calendar() {
	return (
		<div>
			<Head>
				<title>Rental Apartment</title>
				<meta name='description' content='Rental Apartment Website' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='relative overflow-hidden'>
				<div className='relative'>
					<div className='absolute inset-x-0 bottom-0 h-1/2 bg-gray-100'></div>
					<div className=''>
						<div className='relative shadow-xl  sm:overflow-hidden'>
							<div className='absolute inset-0'>
								<img className='h-full w-full object-cover' src='/img/1.jpeg' />
								<div className='absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 mix-blend-multiply'></div>
							</div>
							<div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8  bg-gray-800/80'>
								<h1 className='text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
									A Charming Old House
									<span className='block text-gray-300'>on the Italian Alps</span>
								</h1>
								<div className='mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center'>
									<div className='space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5'>
										<Link href={`/`}>
											<a className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-blue-50 sm:px-8'>
												⬅ Back to the house details
											</a>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
```

Here is the result:

![Screen Shot 2022-03-22 at 10.21.54.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0ffd7e96-0e5f-4ec5-81b9-a5411110aa8d/Screen_Shot_2022-03-22_at_10.21.54.png)

Now we’re going to install a React library called `react-day-picker`.

This is a very useful and handy component to create calendars. You can see the library’s homepage at [https://react-day-picker.js.org](https://react-day-picker.js.org/) to get an idea of what it can do.

Install it using:

```bash
npm install react-day-picker date-fns
```

And add the `DayPicker` component to the page:

```jsx
import Head from 'next/head'
import Link from 'next/link'
**import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'**

export default function Calendar() {
  return (
    <div>
      <Head>
        <title>Rental Apartment</title>
        <meta name='description' content='Rental Apartment Website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='relative overflow-hidden'>
        <div className='relative'>
          <div className='absolute inset-x-0 bottom-0 h-1/2 bg-gray-100'></div>
          <div className=''>
            <div className='relative shadow-xl  sm:overflow-hidden'>
              <div className='absolute inset-0'>
                <img className='h-full w-full object-cover' src='/img/1.jpeg' />
                <div className='absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 mix-blend-multiply'></div>
              </div>
              <div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8  bg-gray-800/80'>
                <h1 className='text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
                  A Charming Old House
                  <span className='block text-gray-300'>
                    on the Italian Alps
                  </span>
                </h1>
                <div className='mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center'>
                  <div className='space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5'>
                    <Link href={`/`}>
                      <a className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-blue-50 sm:px-8'>
                        ⬅ Back to the house details
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        **<div className='flex flex-col mt-10'>
          <p className='text-2xl font-bold text-center my-10'>
            Availability and prices per night
          </p>

          <div className='pt-6 flex justify-center availability-calendar'>
            <DayPicker />
          </div>
        </div>**
      </div>
    </div>
  )
}
```

The calendar should show up like this:

![Screen Shot 2022-06-13 at 16.40.22.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/be03d530-9237-48ea-8d97-bfd788d10ac7/Screen_Shot_2022-06-13_at_16.40.22.jpg)

[4. Create a calendar page.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1b348496-fd61-4207-8639-6bb1d5b6707e/4._Create_a_calendar_page.mp4)

Next lesson: [Show the available dates in the calendar](https://www.notion.so/Show-the-available-dates-in-the-calendar-e11f02c5952743e280bd8dd6e9de8be0)
